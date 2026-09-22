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
    onClick?: () => void
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
                                 onClick
                             }: CommonButtonProps) {
    return (
        <button type={type} onClick={onClick} className={className}>{title}</button>
    )
}