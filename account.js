// Billiards with Cheats - accounts: Google sign-in, username, profile picture.
// Uses Firebase Auth + Cloud Firestore (free Spark plan).
// NOTE: this web config (including apiKey) is NOT a secret. Firebase web keys only identify the project and are meant to sit in public client code.
// What protects the data is firestore.rules (publish it in Firebase console > Firestore > Rules) plus the key restrictions set in Google Cloud console.
const CFG={
  apiKey:'AIzaSyBlOQdidJyt2MbLi5DlCy8fxf067rGDTAk',
  authDomain:'billardswithcheats.firebaseapp.com',
  projectId:'billardswithcheats',
  appId:'1:175857967100:web:c1b94bc3afbf05f1c29c79'
};
const FB='https://www.gstatic.com/firebasejs/12.17.1/';
const DB_ID='';   // leave empty if your Firestore database is the default one; otherwise put its Database ID here (e.g. 'billiards')

if(CFG.apiKey)boot().catch(e=>console.warn('Accounts unavailable:',e));

async function boot(){
  const [A,AU,FS]=await Promise.all([import(FB+'firebase-app.js'),import(FB+'firebase-auth.js'),import(FB+'firebase-firestore.js')]);
  const app=A.initializeApp(CFG),auth=AU.getAuth(app),db=DB_ID?FS.getFirestore(app,DB_ID):FS.getFirestore(app);
  const $=id=>document.getElementById(id);
  let user=null,prof=null,photo='',loadErr='',busy=false,renaming=false,lastC=null,claiming=false;
  const cn=v=>Number.isFinite(v)&&v>0?Math.floor(v):0;
  const ownedOf=p=>{const o=Array.isArray(p.owned)?p.owned.filter(x=>typeof x==='string'):[];return o.includes('basic')?o:['basic',...o]};
  const DAILY=1000;   // keep in sync with dailyBonus() in firestore.rules

  // ---------- helpers ----------
  const show=n=>{for(const s of document.querySelectorAll('#accbox section'))s.classList.toggle('on',s.id==='a-'+n)};
  const err=t=>{$('aerr').textContent=t||''};
  const open=()=>{err('');renaming=false;render();$('accov').style.display='flex'};
  const close=()=>{$('accov').style.display='none'};
  const setBusy=b=>{busy=b;for(const x of document.querySelectorAll('#accbox button'))x.disabled=b};
  function letterAv(n){   // default picture: brass disc with the first letter of the name
    const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
    const gr=g.createRadialGradient(44,38,6,64,64,76);gr.addColorStop(0,'#ffe9a8');gr.addColorStop(.55,'#d9a441');gr.addColorStop(1,'#7a531a');
    g.fillStyle=gr;g.fillRect(0,0,128,128);
    g.fillStyle='#2b180b';g.font='800 64px Georgia,serif';g.textAlign='center';g.textBaseline='middle';
    g.fillText((n||'?').charAt(0).toUpperCase(),64,70);
    return c.toDataURL('image/png');
  }
  const avSrc=p=>(p&&p.photo)||letterAv(p&&p.username);
  function readPhoto(file){   // centre-crop to a 128x128 JPEG (small enough to store inside the profile document)
    return new Promise((res,rej)=>{
      if(!file||!/^image\//.test(file.type))return rej(new Error('Pick an image file.'));
      const url=URL.createObjectURL(file),im=new Image();
      im.onload=()=>{
        try{
          const S=128,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');
          const m=Math.min(im.naturalWidth,im.naturalHeight),sx=(im.naturalWidth-m)/2,sy=(im.naturalHeight-m)/2;
          g.fillStyle='#fff';g.fillRect(0,0,S,S);g.drawImage(im,sx,sy,m,m,0,0,S,S);URL.revokeObjectURL(url);
          let q=.82,d=c.toDataURL('image/jpeg',q);
          while(d.length>38000&&q>.4){q-=.1;d=c.toDataURL('image/jpeg',q)}
          d.length>38000?rej(new Error('That picture is too detailed. Try another one.')):res(d);
        }catch(e){rej(e)}
      };
      im.onerror=()=>{URL.revokeObjectURL(url);rej(new Error("Couldn't read that image."))};
      im.src=url;
    });
  }
  const niceErr=e=>{
    const c=e&&e.code||'';
    if(c==='unavailable'||c==='network-request-failed')return 'No connection. Check your internet and try again.';
    if(c==='permission-denied')return 'The server refused that. If this keeps happening, the Firestore rules may not be published yet.';
    return (e&&e.message)||'Something went wrong.';
  };

  // ---------- UI ----------
  function render(){
    const chip=$('macc');let name='Sign in',src;
    if(!user){src=letterAv('?')}
    else if(loadErr){name='Account';src=letterAv('!')}
    else if(!prof){name='Finish setup';src=letterAv('?')}
    else{name=prof.username;src=avSrc(prof)}
    $('maccn').textContent=name;$('maccav').src=src;chip.hidden=false;
    if(!user)show('out');
    else if(loadErr){show('err');$('aerrt').textContent=loadErr}
    else if(!prof){show('name');$('apv').src=photo||letterAv($('aun').value||'?')}
    else if(renaming){show('ren')}
    else{show('in');$('aav').src=avSrc(prof);$('aname').textContent=prof.username}
    const pn=$('pname');   // use the account name as the lobby name
    if(pn){
      if(user&&prof){pn.value=prof.username;pn.readOnly=true;try{localStorage.setItem('bwc_name',prof.username)}catch(_){}}
      else pn.readOnly=false;
    }
    const cp=$('maccc'),has=!!(user&&prof),v=has?cn(prof.coins):0;   // coin badge next to the profile picture
    if(cp){
      cp.hidden=!has;
      if(has){$('maccv').textContent=v.toLocaleString('en-US');if(lastC!==null&&v!==lastC){cp.classList.remove('bump');void cp.offsetWidth;cp.classList.add('bump')}}
    }
    lastC=has?v:null;
    window.bwcUser=()=>user&&prof?{uid:user.uid,username:prof.username,photo:prof.photo||''}:null;   // for future features (levels, skins, leaderboards)
    try{window.dispatchEvent(new Event('bwc-coins'))}catch(_){}   // tells index.html the owned cues / balance may have changed (restores the saved cue)
  }
  async function load(){
    loadErr='';prof=null;
    if(user){
      try{const s=await FS.getDoc(FS.doc(db,'users',user.uid));prof=s.exists()?s.data():null}
      catch(e){loadErr=niceErr(e)}
    }
    render();
    claimDaily();
  }

  // ---------- coins: balance + owned cues live in users/<uid> (firestore.rules limits how they can change) ----------
  const dayOf=ms=>Math.floor(ms/864e5),tsMs=t=>t&&typeof t.toMillis==='function'?t.toMillis():0;
  async function claimDaily(){   // +1000 coins once per UTC day; the pop-up is shown by index.html
    if(!user||!prof||loadErr||claiming||dayOf(Date.now())<=dayOf(tsMs(prof.dayAt)))return;
    claiming=true;
    try{
      const ref=FS.doc(db,'users',user.uid);
      const total=await FS.runTransaction(db,async tx=>{
        const s=await tx.get(ref);if(!s.exists())return null;
        const d=s.data();if(dayOf(Date.now())<=dayOf(tsMs(d.dayAt)))return null;
        const t=cn(d.coins)+DAILY;tx.update(ref,{coins:t,dayAt:FS.serverTimestamp()});return t;
      });
      if(total!=null){
        prof.coins=total;prof.dayAt=FS.Timestamp.now();render();
        window.dispatchEvent(new CustomEvent('bwc-daily',{detail:{amount:DAILY,total}}));
      }
    }catch(e){console.warn('Daily bonus failed:',e&&e.code||e)}
    claiming=false;
  }
  window.bwcCoins={
    get(){return user&&prof?{coins:cn(prof.coins),owned:ownedOf(prof)}:null},
    async buy(id,price){   // price is re-checked by firestore.rules
      if(!user||!prof)throw new Error('Sign in first.');
      try{
        const ref=FS.doc(db,'users',user.uid);
        const r=await FS.runTransaction(db,async tx=>{
          const s=await tx.get(ref);if(!s.exists())throw new Error('Profile not found.');
          const o=s.data(),coins=cn(o.coins),owned=Array.isArray(o.owned)?o.owned.slice():['basic'];
          if(owned.includes(id))return{coins,owned};
          if(coins<price)throw new Error('Not enough coins.');
          owned.push(id);tx.update(ref,{coins:coins-price,owned});return{coins:coins-price,owned};
        });
        prof.coins=r.coins;prof.owned=r.owned;render();return r;
      }catch(e){throw new Error(niceErr(e))}
    },
    async reward(n){   // match win: 1-1000 coins, at most one reward per 60 s (firestore.rules)
      n=Math.floor(n);if(!user||!prof||!(n>0&&n<=1000))return null;
      const ref=FS.doc(db,'users',user.uid);
      const t=await FS.runTransaction(db,async tx=>{
        const s=await tx.get(ref);if(!s.exists())return null;
        const c=cn(s.data().coins)+n;tx.update(ref,{coins:c,rewardAt:FS.serverTimestamp()});return c;
      });
      if(t!=null){prof.coins=t;render()}
      return t;
    }
  };

  // ---------- actions ----------
  async function login(){
    err('');setBusy(true);
    try{
      const p=new AU.GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});
      await AU.signInWithPopup(auth,p);
    }catch(e){
      const c=e&&e.code||'';
      if(c==='auth/popup-closed-by-user'||c==='auth/cancelled-popup-request'){}
      else if(c==='auth/popup-blocked')err('The sign-in popup was blocked. Allow popups for this site and try again.');
      else if(c==='auth/unauthorized-domain')err("This website isn't in Firebase > Authentication > Settings > Authorized domains.");
      else err('Sign-in failed ('+(c||'unknown')+').');
    }
    setBusy(false);
  }
  async function create(){
    err('');
    const raw=$('aun').value.trim(),low=raw.toLowerCase();
    if(!/^[A-Za-z0-9_]{3,16}$/.test(raw))return err('3-16 letters, numbers or _ only.');
    if(!user)return;
    setBusy(true);
    try{
      if((await FS.getDoc(FS.doc(db,'usernames',low))).exists()){setBusy(false);return err('That name is taken.')}
      const b=FS.writeBatch(db);
      b.set(FS.doc(db,'usernames',low),{uid:user.uid});
      b.set(FS.doc(db,'users',user.uid),{username:raw,usernameLower:low,photo:photo||'',createdAt:FS.serverTimestamp()});
      await b.commit();
      prof={username:raw,usernameLower:low,photo:photo||''};photo='';render();
    }catch(e){
      err(e&&e.code==='permission-denied'?'Could not create the profile. The name may have just been taken, or the Firestore rules are not published yet.':niceErr(e));
    }
    setBusy(false);
  }

  async function rename(){
    err('');
    if(!user||!prof)return;
    const raw=$('arun').value.trim(),low=raw.toLowerCase();
    if(!/^[A-Za-z0-9_]{3,16}$/.test(raw))return err('3-16 letters, numbers or _ only.');
    if(raw===prof.username){renaming=false;return render()}
    setBusy(true);
    try{
      const old=prof.usernameLower,b=FS.writeBatch(db);
      if(low!==old){
        if((await FS.getDoc(FS.doc(db,'usernames',low))).exists()){setBusy(false);return err('That name is taken.')}
        b.set(FS.doc(db,'usernames',low),{uid:user.uid});
        b.delete(FS.doc(db,'usernames',old));
      }
      b.update(FS.doc(db,'users',user.uid),{username:raw,usernameLower:low});
      await b.commit();
      prof.username=raw;prof.usernameLower=low;renaming=false;render();
    }catch(e){
      err(e&&e.code==='permission-denied'?"Couldn't change the name. It may have just been taken, or the new Firestore rules aren't published yet.":niceErr(e));
    }
    setBusy(false);
  }
  $('arenb').onclick=()=>{err('');renaming=true;$('arun').value=prof?prof.username:'';render()};
  $('arcancel').onclick=()=>{err('');renaming=false;render()};
  $('arun').oninput=e=>{e.target.value=e.target.value.replace(/[^A-Za-z0-9_]/g,'')};
  $('arsave').onclick=rename;
  $('macc').onclick=open;
  $('aclose').onclick=close;
  $('accov').onclick=e=>{if(e.target===$('accov'))close()};
  $('agoogle').onclick=login;
  $('acreate').onclick=create;
  $('aretry').onclick=()=>{setBusy(true);load().then(()=>setBusy(false))};
  for(const b of document.querySelectorAll('.sout'))b.onclick=()=>{err('');AU.signOut(auth)};
  for(const b of document.querySelectorAll('.spick'))b.onclick=()=>$('afile').click();
  $('aun').oninput=e=>{
    e.target.value=e.target.value.replace(/[^A-Za-z0-9_]/g,'');
    if(!photo&&user&&!prof)$('apv').src=letterAv(e.target.value||'?');
  };
  $('afile').onchange=async e=>{
    const f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;
    err('');setBusy(true);
    try{
      const d=await readPhoto(f);
      if(user&&prof){await FS.updateDoc(FS.doc(db,'users',user.uid),{photo:d});prof.photo=d}
      else photo=d;
      render();
    }catch(x){err(niceErr(x))}
    setBusy(false);
  };

  // ---------- head-to-head record between two accounts (doc h2h/<uidA>_<uidB>, uids sorted) ----------
  const mapH=(d,my)=>d?{me:my===d.a?d.wa:d.wb,opp:my===d.a?d.wb:d.wa}:{me:0,opp:0};
  window.bwcH2H={
    async get(opp){   // -> {me,opp} = games I won / games they won, or null when not signed in
      if(!user||!opp)return null;
      const my=user.uid,s=await FS.getDoc(FS.doc(db,'h2h',my<opp?my+'_'+opp:opp+'_'+my));
      return mapH(s.exists()?s.data():null,my);
    },
    async record(opp,won,mid){   // counts match `mid` once, even if both players report it
      if(!user||!opp||!mid)return null;
      const my=user.uid,a=my<opp?my:opp,b=my<opp?opp:my,ref=FS.doc(db,'h2h',a+'_'+b),w=won?my:opp;
      const d=await FS.runTransaction(db,async tx=>{
        const s=await tx.get(ref),o=s.exists()?s.data():null;
        if(o&&o.last===mid)return o;
        const nd={a,b,wa:(o?o.wa:0)+(w===a?1:0),wb:(o?o.wb:0)+(w===b?1:0),last:mid};
        tx.set(ref,nd);return nd;
      });
      return mapH(d,my);
    }
  };

  AU.onAuthStateChanged(auth,u=>{user=u;photo='';renaming=false;load()});
}
