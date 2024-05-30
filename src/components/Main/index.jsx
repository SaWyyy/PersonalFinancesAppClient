import NavigationBar from "./Navigationbar"
import TableList from "./TableList"
import "./index.css"

function Main(){
    return(
        <div>
            <NavigationBar></NavigationBar>
            <div className="containter my-5">
                <div className="mx-auto">
                    <h2 className="text-start header">Twoje wydatki</h2>
                </div>
            </div>
            <TableList></TableList>
        </div>
    )
}

export default Main