import React, { Fragment } from "react";
import classes from "./Modal.module.css"
import ReactDom from "react-dom";

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    );
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div classes={classes.content}>
                {props.children}
            </div>
        </div>
    );
}

const Modal = (props) => {
    const poralElement = document.getElementById('overlays');
    return (
        <Fragment>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, poralElement)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, poralElement)}
        </Fragment>
    );
}

export default Modal;