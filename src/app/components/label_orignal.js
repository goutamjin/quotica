const LabelOrignal=({link})=>{

  const getShortHostname = (link) => {
    const maxlen=15;
    const hostname = new URL(link.startsWith('http') ? link : `https://${link}`).hostname;
    return hostname.length <= maxlen ? hostname : `${hostname.slice(0, maxlen)}...`;
  };
  
return (
<div className="flex justify-end items-end h-auto font-medium w-full p-4 pr-3 pb-2">
        <a href={link} className="flex items-center text-xs text-blue-500 hover:underline"
           target="_blank"
          style={{
            fontFamily: " Georgia, serif",
          }}>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-6m3 5l5-5m0 0l-5-5m5 5H9" />
          </svg>
          {getShortHostname(link)}
        </a>
      </div>
);

}
export default LabelOrignal;