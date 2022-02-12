export default function MetadataBox(props) {
	return (
		`<p>${props.hasBook === 'Y' ? '소장' : '미소장'}</p><p>${props.loanAvailable === 'Y' ? '대출 가능' : '대출 불가'}</p>`
	)
}