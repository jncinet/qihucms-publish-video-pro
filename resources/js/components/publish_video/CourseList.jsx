import React from "react";

export default props => {
    return (
        <div className="vw-100 vh-100" style={{overflow: "auto", paddingTop: 44}}>
            <div className="d-flex flex-wrap p-1">
                {
                    (props.items || []).map(
                        item => (
                            <div key={item.id} className="w-33 p-1 position-relative" onClick={() => props.callback(item.src)}>
                                <div
                                    className="bg-secondary  vh-26 rounded d-flex justify-content-center align-items-center overflow-hidden">
                                    <img className="w-100" src={item.cover} alt={item.title}/>
                                </div>
                                <div className="text-white w-100 text-shadow qh-black-gradient font-size-14 p-2 position-absolute absolute-bottom">
                                    {item.title}
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}