import { Shield, Tags, UserRound, Globe2, Headphones } from "lucide-react";
import { useLang } from "../lib/useLang";
import "../styles-why-choose-us.css";

const items = [
  { icon: Shield, title: ["Trusted & Reliable", "الثقة والموثوقية"], text: ["A trusted name, backed by Voyage Plus – a pioneer in the travel industry.", "اسم موثوق تدعمه فوياج بلاس، إحدى الشركات الرائدة في مجال السفر."] },
  { icon: Tags, title: ["Best Price Promise", "وعد بأفضل الأسعار"], text: ["Competitive pricing with exclusive offers for both business and personal travel.", "أسعار تنافسية وعروض حصرية لرحلات العمل والسفر الشخصي."] },
  { icon: UserRound, title: ["Personalized Service", "خدمة مخصصة"], text: ["Personalized service tailored to both corporate and leisure travelers.", "خدمة مصممة خصيصاً لتلبية احتياجات رحلات العمل والترفيه."] },
  { icon: Globe2, title: ["Global Network", "شبكة عالمية"], text: ["A global network ensuring reliability and coverage across continents.", "شبكة عالمية تضمن الموثوقية والتغطية عبر القارات."] },
  { icon: Headphones, title: ["24/7 Support", "دعم على مدار الساعة"], text: ["Professional, multilingual team dedicated to client satisfaction.", "فريق محترف متعدد اللغات يضع رضا العملاء في مقدمة أولوياته."] },
];

export default function WhyChooseUs() {
  const { lang, dir } = useLang();
  const i = lang === "ar" ? 1 : 0;
  return (
    <section className="why-section" dir={dir} aria-labelledby="why-title">
      <p className="why-eyebrow">{i ? "لماذا تختارنا" : "Why Choose Us"}</p>
      <h2 id="why-title">{i ? "رحلتك هي أولويتنا." : "Your Journey, Our Priority."}</h2>
      <p className="why-intro">{i ? "بخبرتنا واهتمامنا وشبكتنا العالمية، نصنع تجارب سفر سلسة يمكنك الوثوق بها." : "With expertise, care and a global network, we create seamless travel experiences you can trust."}</p>
      <div className="why-grid">
        {items.map(({ icon: Icon, title, text }) => (
          <article className="why-card" key={title[0]}>
            <span className="why-icon"><Icon size={31} strokeWidth={1.8} aria-hidden="true" /></span>
            <h3>{title[i]}</h3>
            <span className="why-divider" aria-hidden="true" />
            <p>{text[i]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
