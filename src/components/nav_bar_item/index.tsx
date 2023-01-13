

export default function NavBarItem (
    {icon , text , onClick , isSelect} : {
        icon : JSX.Element,
        text : string,
        onClick : () => void,
        isSelect: boolean,
    }
) : JSX.Element {
    return <div onClick={onClick} className={`flex flex-row rounded-lg p-[8px] mb-[12px] cursor-pointer ${isSelect ? 'bg-[#E9F5FE]' : 'hover:bg-[#FAFAFA]' }`}>
       <div className="px-4">
       { icon}
       </div>
        <p className={`mt-[4px]  text-[#262626] block whitespace-nowrap ${isSelect && 'text-[#0C7FDA] font-semibold'}`} >{text}</p>
    </div>
}