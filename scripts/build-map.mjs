import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { feature } from "topojson-client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ISO 3166-1 numeric to alpha-2 lookup table
const NUMERIC_TO_ALPHA2 = {
  "004": "AF", "008": "AL", "012": "DZ", "016": "AS", "020": "AD", "024": "AO", "028": "AG", "031": "AZ", "032": "AR", "051": "AM",
  "036": "AU", "040": "AT", "044": "BS", "048": "BH", "050": "BD", "052": "BB", "112": "BY", "056": "BE", "084": "BZ", "204": "BJ",
  "064": "BT", "068": "BO", "070": "BA", "072": "BW", "076": "BR", "096": "BN", "100": "BG", "854": "BF", "108": "BI", "116": "KH",
  "120": "CM", "124": "CA", "132": "CV", "140": "CF", "148": "TD", "152": "CL", "156": "CN", "170": "CO", "174": "KM", "178": "CG",
  "180": "CD", "188": "CR", "384": "CI", "191": "HR", "192": "CU", "196": "CY", "203": "CZ", "208": "DK", "262": "DJ", "212": "DM",
  "214": "DO", "218": "EC", "818": "EG", "222": "SV", "226": "GQ", "232": "ER", "233": "EE", "231": "ET", "242": "FJ", "246": "FI",
  "250": "FR", "266": "GA", "270": "GM", "268": "GE", "276": "DE", "288": "GH", "300": "GR", "308": "GD", "320": "GT", "324": "GN",
  "624": "GW", "328": "GY", "332": "HT", "340": "HN", "348": "HU", "352": "IS", "356": "IN", "360": "ID", "364": "IR", "368": "IQ",
  "372": "IE", "376": "IL", "380": "IT", "388": "JM", "392": "JP", "400": "JO", "398": "KZ", "404": "KE", "296": "KI", "408": "KP",
  "410": "KR", "414": "KW", "417": "KG", "418": "LA", "428": "LV", "422": "LB", "426": "LS", "430": "LR", "434": "LY", "438": "LI",
  "440": "LT", "442": "LU", "807": "MK", "450": "MG", "454": "MW", "458": "MY", "462": "MV", "466": "ML", "470": "MT", "584": "MH",
  "478": "MR", "480": "MU", "484": "MX", "583": "FM", "498": "MD", "492": "MC", "496": "MN", "499": "ME", "504": "MA", "508": "MZ",
  "104": "MM", "516": "NA", "520": "NR", "524": "NP", "528": "NL", "554": "NZ", "558": "NI", "562": "NE", "566": "NG", "578": "NO",
  "512": "OM", "586": "PK", "585": "PW", "591": "PA", "598": "PG", "600": "PY", "604": "PE", "608": "PH", "616": "PL", "620": "PT",
  "634": "QA", "642": "RO", "643": "RU", "646": "RW", "659": "KN", "662": "LC", "670": "VC", "882": "WS", "674": "SM", "678": "ST",
  "682": "SA", "686": "SN", "688": "RS", "690": "SC", "694": "SL", "702": "SG", "703": "SK", "705": "SI", "90": "SB", "706": "SO",
  "710": "ZA", "728": "SS", "724": "ES", "144": "LK", "729": "SD", "740": "SR", "748": "SZ", "752": "SE", "756": "CH", "760": "SY",
  "158": "TW", "762": "TJ", "834": "TZ", "764": "TH", "626": "TL", "768": "TG", "776": "TO", "780": "TT", "788": "TN", "792": "TR",
  "795": "TM", "798": "TV", "800": "UG", "804": "UA", "784": "AE", "826": "GB", "840": "US", "858": "UY", "860": "UZ", "862": "VE",
  "704": "VN", "887": "YE", "894": "ZM", "716": "ZW"
};

// Project coordinates [lon, lat] to SVG canvas [width 1000, height 500] using Equirectangular projection
function project([lon, lat]) {
  const x = Math.round((lon + 180) * (1000 / 360) * 100) / 100;
  const y = Math.round((90 - lat) * (500 / 180) * 100) / 100;
  return [x, y];
}

function ringToSvgPath(ring) {
  if (!ring || ring.length === 0) return "";
  const points = ring.map(project);
  return `M${points[0][0]},${points[0][1]}` + points.slice(1).map(p => `L${p[0]},${p[1]}`).join("") + "Z";
}

function featureToSvgPath(featureObj) {
  const geom = featureObj.geometry;
  if (!geom) return "";
  if (geom.type === "Polygon") {
    return geom.coordinates.map(ringToSvgPath).join(" ");
  }
  if (geom.type === "MultiPolygon") {
    return geom.coordinates.map(poly => poly.map(ringToSvgPath).join(" ")).join(" ");
  }
  return "";
}

function computeBoundsAndCentroid(featureObj) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let sumX = 0, sumY = 0, count = 0;

  function processCoord([lon, lat]) {
    const [x, y] = project([lon, lat]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    sumX += x;
    sumY += y;
    count++;
  }

  const geom = featureObj.geometry;
  if (geom) {
    if (geom.type === "Polygon") {
      geom.coordinates.forEach(ring => ring.forEach(processCoord));
    } else if (geom.type === "MultiPolygon") {
      geom.coordinates.forEach(poly => poly.forEach(ring => ring.forEach(processCoord)));
    }
  }

  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const area = width * height;
  const centroidX = count > 0 ? Math.round((sumX / count) * 100) / 100 : Math.round(((minX + maxX) / 2) * 100) / 100;
  const centroidY = count > 0 ? Math.round((sumY / count) * 100) / 100 : Math.round(((minY + maxY) / 2) * 100) / 100;

  return {
    bbox: [Math.round(minX), Math.round(minY), Math.round(maxX), Math.round(maxY)],
    centroid: [centroidX, centroidY],
    isSmall: area < 120 || (width < 8 && height < 8)
  };
}

function main() {
  const topoPath = path.join(__dirname, "../node_modules/world-atlas/countries-110m.json");
  if (!fs.existsSync(topoPath)) {
    console.error("TopoJSON file not found at", topoPath);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(topoPath, "utf8"));
  const geojson = feature(rawData, rawData.objects.countries);

  const worldPaths = [];

  geojson.features.forEach((feat) => {
    const numId = String(feat.id).padStart(3, "0");
    const alpha2 = NUMERIC_TO_ALPHA2[numId] || `XX_${numId}`;
    const pathData = featureToSvgPath(feat);
    const { bbox, centroid, isSmall } = computeBoundsAndCentroid(feat);
    const name = feat.properties?.name || alpha2;

    if (pathData) {
      worldPaths.push({
        id: alpha2,
        numId,
        name,
        d: pathData,
        bbox,
        centroid,
        isSmall
      });
    }
  });

  const outPath = path.join(__dirname, "../src/data/worldPaths.js");
  const content = `// Generated world map paths from Natural Earth 110m TopoJSON
export const worldPaths = ${JSON.stringify(worldPaths, null, 2)};
`;

  fs.writeFileSync(outPath, content, "utf8");
  console.log(`Generated ${worldPaths.length} country paths into src/data/worldPaths.js`);
}

main();
