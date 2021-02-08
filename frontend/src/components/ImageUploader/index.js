import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as ImgAct } from "../../redux/modules/Image";

const mapDispatchToProps = (dispatch, props) => {
    return {
        uploadPostImg: (img) => {
            dispatch(ImgAct.uploadPostImg(img));
        },
    };
};

export default connect(null, mapDispatchToProps)(Container);
