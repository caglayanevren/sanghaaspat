function LCT(props) {
    switch (props.locale) {
        case 'en':
            return `${props.en}`;
        case 'tr':
            return `${props.tr}`;
        default:
            return 'error';
    }
}

export default LCT;
