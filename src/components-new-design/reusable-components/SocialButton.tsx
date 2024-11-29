import Image from "next/image";


export const SocialButton = (props: {
    link: string;
    src: string;
}) => {
    return <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className="w-[50px] h-[50px]"
    >
        <Image
            alt="cursor discord"
            className="social-icon"
            src={props.src}
            width={50}
            height={50}
        />
    </a>
}
