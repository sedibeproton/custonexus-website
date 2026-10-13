import Script from "next/script";

const googleAdsId = "AW-18508225970";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const loaderId = measurementId || googleAdsId;

  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());${measurementId ? `gtag('config',${JSON.stringify(measurementId)},{anonymize_ip:true});` : ""}gtag('config',${JSON.stringify(googleAdsId)},{allow_ad_personalization_signals:false});`}
      </Script>
      <Script id="google-tag-loader" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`} strategy="afterInteractive" />
    </>
  );
}
