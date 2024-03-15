import WriteComponent from "./WriteComponent";

export const WritePage = (props) => {
    return (
        <>
            <WriteComponent
                user={props.user}
                loggedIn={props.loggedIn} />
            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
                <img src={require("../Pictures/writing.png")} alt="" style={{ height: '10em', borderRadius: '5em', boxShadow: '0px 10px 15px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5em', fontSize: '1.2em' }}>
                It's always a good time to write.
            </div>

        </>
    );
};

export default WritePage;