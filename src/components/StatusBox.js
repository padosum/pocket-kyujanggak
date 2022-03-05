export default function StatusBox(props) {
  return `<div class="message d-flex">
        ${
          props.hasBook === 'Y'
            ? `<span class="color-success"><i class="fa fa-regular fa-face-grin-beam"></i> 소장</span>`
            : `<span class="color-unavailable"><i class="fa-regular fa-face-grin-beam-sweat"></i> 미소장</span>`
        }
        ${
          props.loanAvailable === 'Y'
            ? '<span class="color-success ml-2"><i class="fa fa-regular fa-face-grin-beam"></i> 대출 가능</span>'
            : '<span class="color-unavailable ml-2"><i class="fa-regular fa-face-grin-beam-sweat"></i> 대출 불가</span>'
        }
    </div>`
}
