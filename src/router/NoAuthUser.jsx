export default function RouterNoAuthUserApp(props){
    console.log(props.auth)
    const NoAuthUserUrl = [
    {
        url: "/",
        Pages: <Main_page />
    }
    ]
    return(
        <Routes>
            {
                NoAuthUserUrl.map((element)=>{
                    return(
                        <Route path={element.url} element={element.Pages}/>
                    )
                })
            }
        </Routes>
    )
}