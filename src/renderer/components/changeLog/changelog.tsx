import subEventHelper from "@common/subEvent";
import { changeLog } from "@src/typings/changelog";
import update from "@src/typings/update";
import React, { useEffect } from "react";

import "./changelog.scss";

type Props = {
    update: update;
    changelog: changeLog
}

const ChangeLog: React.FunctionComponent<Props> = (props: Props) => {

    useEffect(()=>{
        if(props.update.firstLaunch[0] === "true"){
            document.getElementById("changelog-back").style.display = "flex";
        }

    },[])

    const close = (e: React.MouseEvent) => {

        if(e.target !== e.currentTarget){
            return;
        }

        e.preventDefault();

        document.getElementById("changelog-back").style.display = "none";
    }

    return (
        <div id="changelog-back" onClick={close}>
            <div id="changelog-container">
                <div className="changelog-header">
                    <h1>Changelog</h1>
                </div>

                <div className="changelog-content">
                    <div className="changelog-content-header">
                        <h2>Version {props.changelog.version} - {props.changelog.date}</h2>
                    </div>
                    <div className="changelog-content-content">
                        <h3 style={{display: props.changelog.additions.length > 0 ? "block" : "none"}}>
                            Addition{props.changelog.additions.length > 1 ? "s" : ""}:
                        </h3>
                        <ul className="changelog-content-content-additions" style={{display: props.changelog.additions.length > 0 ? "block" : "none"}}>
                            {props.changelog.additions.map((addition, index)=>{
                                return (
                                    <li key={index}>{addition}</li>
                                )
                            })}
                        </ul>
                        <h3 style={{display: props.changelog.removals.length > 0 ? "block" : "none"}}>
                            Removal{props.changelog.removals.length > 1 ? "s" : ""}:
                        </h3>
                        <ul className="changelog-content-content-changes" style={{display: props.changelog.removals.length > 0 ? "block" : "none"}}>
                            {props.changelog.removals.map((change, index)=>{
                                return (
                                    <li key={index}>{change}</li>
                                )
                            })}
                        </ul>
                        <h3 style={{display: props.changelog.fixes.length > 0 ? "block" : "none"}}>
                            Fixe{props.changelog.fixes.length > 1 ? "s" : ""}:
                        </h3>
                        <ul className="changelog-content-content-fixes" style={{display: props.changelog.fixes.length > 0 ? "block" : "none"}}>
                            {props.changelog.fixes.map((fix, index)=>{
                                return (
                                    <li key={index}>{fix}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="changelog-content-footer" style={{display: props.changelog.notes.length > 0 ? "block" : "none"}}>
                        <h3>Note{props.changelog.notes.length > 1 ? "s" : ""}:</h3>
                        <ul className="changelog-content-footer-notes">
                            {props.changelog.notes.map((note, index)=>{
                                return (
                                    <li key={index}>{note}</li>
                                )
                            }
                            )}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChangeLog;