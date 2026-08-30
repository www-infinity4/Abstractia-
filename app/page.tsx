"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
const films=[
 {title:"The Cabinet of Dr. Caligari",short:"Caligari",director:"Robert Wiene",chapter:"ENTER THE DREAM",artist:"Pink Floyd",album:"Wish You Were Here",list:"OLAK5uy_klU9jB4SMO5SqEyFazPAVbDek2j0JVQxY",archive:"TheCabinetOfDr.Caligari1920SilentMovieHorror",file:"The Cabinet of Dr. Caligari (1920) [Silent Movie] [Horror].mp4",color:"#c7b6ff",note:"Crooked streets. Unreliable dreams. Pink Floyd’s spacious passages give this strange world room to breathe."},
 {title:"The Golem",short:"The Golem",director:"Paul Wegener & Carl Boese",chapter:"AWAKEN THE GIANT",artist:"Metallica",album:"Metallica · The Black Album",list:"PLWVo2tank-zztO8BuDhNaf3c3v4GuEIap",archive:"TheGolem_893",file:"TheGolem_512kb.mp4",color:"#efb17a",note:"A creature of clay, a city under threat. Heavy riffs meet the physical weight and looming architecture of this expressionist fantasy."},
 {title:"The Mark of Zorro",short:"Zorro",director:"Fred Niblo · starring Douglas Fairbanks",chapter:"MAKE YOUR ESCAPE",artist:"Journey",album:"Escape",list:"PLNPGM2D7aODcXjsBcs_OjWPV98wuwzb0i",archive:"vidzo",file:"The-Mark-of-Zorro-v2.mp4",color:"#afe2c3",note:"A masked hero, impossible escapes, and a little romance. Journey’s soaring hooks carry the evening toward a brighter finish."}
];
const escapeTracks=["1k8craCGpgs","5f7bgRtaSwk","EX-_WkUxyLU","RW9O56XqDMI","hCySG1Rv-mc","ayxBzwgzLrY","Ky67z1Om2M8","0WdWH30SLCM","6pwm_XGqbBw","M2e3XN7yVjM"];
type Player={cuePlaylist(ids:string[]):void;playVideo():void;pauseVideo():void;playVideoAt(n:number):void;nextVideo():void;setLoop(b:boolean):void;destroy():void};
type YT={Player:new(el:HTMLElement,options:Record<string,unknown>)=>Player};
let api:Promise<YT>|undefined;
function loadMusic(){
 const w=window as unknown as {YT?:YT;onYouTubeIframeAPIReady?:()=>void};
 if(w.YT?.Player)return Promise.resolve(w.YT);
 if(!api)api=new Promise<YT>((resolve,reject)=>{
  const s=document.createElement("script");let done=false;
  const fail=()=>{if(done)return;done=true;api=undefined;s.remove();reject(new Error("Unavailable"));};
  const timer=setTimeout(fail,15000);
  w.onYouTubeIframeAPIReady=()=>{if(done)return;done=true;clearTimeout(timer);resolve(w.YT!);};
  s.src="https://www.youtube.com/iframe_api";s.onerror=fail;document.head.appendChild(s);
 });
 return api;
}
function Theater({index,next}:{index:number;next:()=>void}){
 const f=films[index],v=useRef<HTMLVideoElement>(null),mount=useRef<HTMLDivElement>(null),music=useRef<Player|null>(null),active=useRef(true);
 const [ready,setReady]=useState(false),[playing,setPlaying]=useState(false),[started,setStarted]=useState(false),[ended,setEnded]=useState(false),[reload,setReload]=useState(0),[filmError,setFilmError]=useState(""),[musicError,setMusicError]=useState(""),[status,setStatus]=useState("Choose Start pairing. If sound is blocked, tap Play inside the music player.");
 useEffect(()=>{
  active.current=true;let disposed=false;let p:Player|undefined;setReady(false);setMusicError("");
  const box=mount.current!,frame=document.createElement("iframe");
  const tracks=index===2?escapeTracks:null;
  const params=new URLSearchParams({enablejsapi:"1",origin:window.location.origin,playsinline:"1",loop:"1"});
  if(tracks)params.set("playlist",tracks.join(","));else{params.set("listType","playlist");params.set("list",f.list);}
  frame.src="https://www.youtube.com/embed/"+(tracks?tracks[0]:"videoseries")+"?"+params;frame.title=f.artist+" — "+f.album;
  frame.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";box.appendChild(frame);
  loadMusic().then(yt=>{if(disposed)return;p=new yt.Player(frame,{events:{
   onReady:()=>{if(disposed)return;music.current=p!;if(tracks)p!.cuePlaylist(tracks);p!.setLoop(true);setReady(true);},
   onError:(e:{data:number})=>{if(disposed)return;v.current?.pause();setPlaying(false);setMusicError("YouTube could not play this selection ("+e.data+"). Try Next song or Reload music. Film controls still work.");},
   onAutoplayBlocked:()=>{if(disposed)return;v.current?.pause();setPlaying(false);setStatus("Tap Play inside the music player to allow sound, then Resume pairing.");}
  }});}).catch(()=>{if(!disposed)setStatus("Shared controls could not connect. You can still play the film and visible music player separately.");});
  return()=>{disposed=true;active.current=false;music.current=null;p?.destroy();box.replaceChildren();};
 },[reload]);
 useEffect(()=>{const el=v.current;return()=>{el?.pause();};},[]);
 function pause(){v.current?.pause();music.current?.pauseVideo();setPlaying(false);if(!music.current)setReload(n=>n+1);}
 function play(reset=false){
  if(filmError)return;
  if(reset||!started||ended){if(v.current)v.current.currentTime=0;music.current?.playVideoAt(0);}else music.current?.playVideo();
  setStarted(true);setEnded(false);setPlaying(true);
  if(v.current){v.current.muted=true;v.current.play().catch(()=>{if(active.current){pause();setStatus("Tap Play on the film, then Resume pairing.");}});}
  setStatus(ready?"Both players requested. Ads and buffering can shift timing; Restart begins both from the top.":"Film started. Tap Play in the music player while shared controls connect.");
 }
 return <section className="theater" aria-label={f.title+" theater"}>
  <div className="picture"><div className="labelbar"><span>PICTURE / 0{index+1}</span><span>1920 · FILM MUTED</span></div>
   <video ref={v} src={"https://archive.org/download/"+f.archive+"/"+encodeURIComponent(f.file)} poster={"https://archive.org/services/img/"+f.archive} controls muted playsInline preload="metadata" aria-label={f.title}
    onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onVolumeChange={()=>{if(v.current&&!v.current.muted)v.current.muted=true;}}
    onEnded={()=>{pause();setEnded(true);setStatus("Feature complete. Continue to the next pairing or restart this one.");}}
    onError={()=>{pause();setFilmError("This Archive film could not load. Try Reload film; music is independent.");}}/>
   <div className="film-title"><p>{f.director}</p><h2>{f.title}</h2></div>
   {filmError&&<div className="error" role="alert">{filmError}<Button variant="outline" onClick={()=>{setFilmError("");v.current?.load();}}>Reload film</Button></div>}
  </div>
  <aside className="sound"><div className="labelbar"><span>THE NEW SOUNDTRACK</span><span>↻ REPEAT</span></div><div className="sound-inner"><p className="artist">{f.artist}</p><h2>{f.album}</h2><div ref={mount} className="music-player"/>
   <div className="transport"><Button disabled={!!filmError} onClick={()=>playing?pause():play()}>{playing?"Ⅱ Pause pairing":started?"▶ Resume pairing":"▶ Start pairing"}</Button><Button variant="outline" disabled={!!filmError} onClick={()=>play(true)}>↻ Restart</Button></div>
   <div className="secondary"><Button variant="ghost" disabled={!ready} onClick={()=>{music.current?.nextVideo();setMusicError("");setStatus("Next song requested. Resume the film when ready.");}}>Next song →</Button><Button variant="ghost" onClick={()=>{v.current?.pause();setPlaying(false);setReload(n=>n+1);setStatus("Reloading music from the beginning.");}}>Reload music</Button></div>
   {musicError&&<p className="error" role="alert">{musicError}</p>}<p className="status" role="status">{status}</p>
   {index===2&&<p className="status">Escape’s ten-song sequence uses individual Journey uploads, including remasters, instead of the unavailable playlist.</p>}<div className="sources"><a href={"https://archive.org/details/"+f.archive} target="_blank" rel="noreferrer">Film source ↗</a><a href={index===2?"https://www.youtube.com/watch?v="+escapeTracks[0]:"https://www.youtube.com/playlist?list="+f.list} target="_blank" rel="noreferrer">Album source ↗</a></div>
  </div></aside>
  <div className="curation"><p className="eyebrow">WHY THESE TWO?</p><p>{f.note}</p><Button variant="outline" onClick={next}>{index===2?"Back to Caligari":"Next feature"} →</Button></div>
 </section>;
}
export default function Home(){
 const [selected,setSelected]=useState(0);
 return <main style={{"--accent":films[selected].color} as React.CSSProperties}>
  <header><a href="./" className="brand">abstractia<span>®</span></a><p>THE ALTERNATE-SOUNDTRACK CINEMA</p><span className="edition">VOL. 01 / 1920</span></header>
  <div className="intro"><h1>Three pictures.<br/><em>Another dimension.</em></h1><p>Silent cinema. Loud imagination.<br/>Choose a film. Let the album roll.</p></div>
  <nav className="program" aria-label="Three-film program">{films.map((f,i)=><Button key={f.title} variant="outline" className={selected===i?"program-card selected":"program-card"} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="number">0{i+1}</span><span><small>{f.chapter}</small><strong>{f.short}</strong><small>{f.artist} · {f.album}</small></span><span className="selected-mark">{selected===i?"●":"↗"}</span></Button>)}</nav>
  <Theater key={selected} index={selected} next={()=>setSelected((selected+1)%films.length)}/>
  <footer><span>ABSTRACTIA / Infinity ®</span><p>One pairing at a time. Music repeats; switching films stops the previous pair.<br/>YouTube ads, availability and buffering may affect timing. No uploads needed.</p><span>CURATED CONNECTIONS,<br/>NOT PERFECT SYNCHRONIZATION.</span></footer>
 </main>;
}
