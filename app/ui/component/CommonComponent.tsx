interface CommonLabelInputProps {
    id?: string,
    title?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    onChange: (value: string) => void
}

interface CommonButtonProps {
    type?: "submit" | "reset" | "button",
    title?: string,
    className?: string,
    onClick?: () => void,
    isImage?: string
}

export function CommonLabelInput({
                                     id = "",
                                     title = "-",
                                     type = "text",
                                     placeholder = "-",
                                     value = "-",
                                     onChange,
                                 }: CommonLabelInputProps) {
    return (
        <div>
            <label htmlFor={id} className="label-common">{title}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input-common"
            />
        </div>
    );
}

export function CommonButton({
 type = "submit",
 title = "-",
 className = "button-common",
 onClick,
 isImage = ""
 }: CommonButtonProps)

{
    return (
        <button type={type} onClick={onClick} className={className}>
            {isImage === "촬영" && <span aria-hidden="true">📷</span>}
            {isImage === "앨범" && <span aria-hidden="true">🖼️</span>}
            {title}
        </button>
    )
}