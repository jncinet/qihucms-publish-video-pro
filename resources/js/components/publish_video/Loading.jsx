import React from "react";

class Loading extends React.Component {
    render() {
        return (
            <div style={{background: "rgba(0,0,0,.5)", zIndex: 98}}
                 className="rounded fixed-top w-100 vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center bg-black-30 rounded p-3">
                    <div className="spinner-border text-white-50" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="font-size-14 pt-2 line-height-1 text-white-50">处理中…</div>
                </div>
            </div>
        );
    }
}

export default Loading;