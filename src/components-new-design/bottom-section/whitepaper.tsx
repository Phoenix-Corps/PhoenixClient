import Arrow from "@public/up-left-arrow.svg";

export const Whitepaper = (props: {
    text: string
}) => {
    return <div className="w-[100%] pl-10 hover:w-[101%] bg-white bg-opacity-30 backdrop-blur flex flex-column cursor-pointer">
        <div className="whitepaper-font-item grow content-center">
            {props.text}
        </div>
        <div className="relative top-10 right-10">
            <Arrow className="w-[20px] h-[20px]" />
        </div>
    </div>
}
