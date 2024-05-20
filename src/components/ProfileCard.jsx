import { useState } from "react"
import { Badge, Card, CardContent, CardHeader, createTheme, List, ListItem, ListItemIcon, ListItemText, ThemeProvider } from "@mui/material"
import { useEffect } from "react"
import { tableData, accionistaTable, cortesiaTable, participacionTable } from "../data"
import ReceiptIcon from '@mui/icons-material/Receipt';

const ProfileCard = ({ doctor }) => {

    const theme = createTheme({
        palette: {
          facturado: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
          },
        },
      });

    const [profileDoctor, setProfileDoctor] = useState({} || '')

    useEffect(() => {
        if(accionistaTable.find(data => data.code === doctor)){
            setProfileDoctor(accionistaTable.find(data => data.code === doctor))
        } else if(cortesiaTable.find(data => data.code === doctor)){
            setProfileDoctor(cortesiaTable.find(data => data.code === doctor))
        } else {
            setProfileDoctor(participacionTable.find(data => data.code === doctor))
        }
    },[doctor])

    const handleBalance = (filter) => {
        const filterBalance = tableData.filter( data => data.code === doctor && data.status === filter ).map( data => ({ price: data.price }) ).reduce(( sum, { price } ) => sum + parseInt(price), 0)
        return filterBalance
    }

    const handleCountInvoice = (filter) => {
        const filterCount = tableData.filter(data => data.code === doctor && data.status === filter)
        return filterCount.length
    }

    const totalInvoice = tableData.filter(data => data.code === doctor)

    return (
        <ThemeProvider theme={theme}>
            <Card>
                { typeof profileDoctor === 'object' ? (
                    <CardHeader
                        avatar={(
                        <Badge badgeContent={totalInvoice.length} color="primary"  >
                            <ReceiptIcon />
                        </Badge> )}
                        title={profileDoctor.fullName}
                        subheader={profileDoctor.speciality}
                    />
                    ) : "" 
                }
                <CardContent>
                { typeof profileDoctor === 'object' ? (
                <>
                    <p><b>TOTAL: </b> {tableData.filter( data => data.code === doctor).map( data => ({ price: data.price }) ).reduce(( sum, { price } ) => sum + parseInt(price), 0)}</p>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Badge color="error" badgeContent={handleCountInvoice('No Facturado')} >
                                    <ReceiptIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary={`NO FACTURADO: ${handleBalance("No Facturado")}`} secondary="HOLA" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Badge color="facturado" badgeContent={handleCountInvoice('Facturado')} >
                                    <ReceiptIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary={`FACTURADO: ${handleBalance("Facturado")}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Badge color="primary" badgeContent={handleCountInvoice('Cobrado')} >
                                    <ReceiptIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary={`COBRADO: ${handleBalance("Cobrado")}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Badge color="success" badgeContent={handleCountInvoice('Liquidado')} >
                                    <ReceiptIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary={`LIQUIDADO: ${handleBalance("Liquidado")}`} />
                        </ListItem>
                    </List>
                </>
                ) : <h2>{profileDoctor}</h2>
                }
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}

export default ProfileCard