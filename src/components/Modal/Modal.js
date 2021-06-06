import React from 'react';
import "./Modal.css";

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        <button className="close" onClick={close}> &times; </button>
                        <img className="check"src="/images/check.png" width="50px"/>
                    </header>
                    <main>
                        Copied to clipboard
                    </main>
                    <footer>
                        <button className="close" onClick={close}> OK </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;