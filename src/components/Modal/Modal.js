import React, { useState } from 'react';
import './Modal.css';
import { Button } from '@material-ui/core';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, link } = props;
  const [copied, setCopied] = useState(false);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <main className="main">
            <div className="head">
              {copied ? (
                <button className="close2"> &times; </button>
              ) : (
                <button className="close1" onClick={close}>
                  {' '}
                  &times;{' '}
                </button>
              )}

              {copied ? (
                <img
                  className="check"
                  src="/images/greencheck.png"
                  width="80px"
                />
              ) : (
                <div className="blockmouse">
                  <img
                    className="check"
                    src="/images/graycheck.png"
                    width="80px"
                  />
                  <div className="space1" height="100px"></div>
                </div>
              )}
            </div>

            {copied ? (
              <div className="green">
                <div className="confirm">Copied to clipboard</div>

                <button
                  className="close"
                  onClick={() => {
                    close();
                    setCopied(false);
                  }}
                >
                  <div>OK</div>
                </button>
              </div>
            ) : (
              <div className="linkcopy">
                <div className="linkbox">{link}</div>
                <button
                  className="copybtn"
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  <div>COPY</div>
                </button>
              </div>
            )}
            <div className="space2"></div>
          </main>
          {/* <footer>
                        <button className="close" onClick={close}> OK </button>
                    </footer> */}
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
