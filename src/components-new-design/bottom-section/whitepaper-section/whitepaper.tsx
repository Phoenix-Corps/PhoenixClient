import Arrow from "@public/up-left-arrow.svg";

export const Whitepaper = (props: {
  text: string,
  link?: string,
}) => {
  return <a className="w-[100%] hover:w-[101%]" href={props.link} target="_blank">
    <div className="pl-10 bg-white bg-opacity-30 backdrop-blur flex flex-column cursor-pointer">
      <div className="whitepaper-font-item grow content-center">
        {props.text}
      </div>
      <div className="relative top-10 right-10">
        <Arrow className="w-[20px] h-[20px]" />
      </div>
    </div>
  </a>
}
