import { ImageResponse } from "next/og";
export const runtime="edge";
export const alt="AI比較｜機能・利用条件と公式根拠";
export const size={width:1200,height:630};
export const contentType="image/png";
const names:Record<string,string>={claude:"Claude",chatgpt:"ChatGPT",grok:"Grok",perplexity:"Perplexity",gemini:"Gemini"};
export default async function Image({params}:{params:Promise<{slug:string}>}){const p=(await params).slug.split("-vs-");const title=p.length===2 && p.every(id=>Object.hasOwn(names,id)) ? p.map(id=>names[id]).join(" / "):"AI comparison";return new ImageResponse(<div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",height:"100%",background:"#14253e",color:"#fff",padding:64}}><div style={{fontSize:24,color:"#aec8e5"}}>aierabi.jp</div><div style={{fontSize:64,marginTop:40}}>{title}</div><div style={{fontSize:28,marginTop:32}}>Features · Plans · Sources</div><div style={{fontSize:22,color:"#aec8e5",marginTop:32}}>Official information, not a performance ranking</div></div>,size);}
