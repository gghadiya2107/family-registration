import { checkUser } from '@/network/actions/checkUser';
import { setCookiesValues } from '@/utils/cookies';
import { Box, LinearProgress, Typography } from '@mui/material';
import axios from 'axios'
import bodyParser from 'body-parser';import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
export async function getServerSideProps(context) {
    try {
        const { req } = context;


		console.log(req, "server side props")

        // Parse request body using body-parser middleware
        await new Promise((resolve, reject) => {
            bodyParser.urlencoded({ extended: true })(req, null, resolve);
        });


		console.log(req.body , "skjndasnjdkjasndjkasdnjk")
        const { token, user_id } = req.body || {};
		console.log('before return')
        return {
            props: {
                data: {
                    token: token || "",
                    email: user_id || "",
					allData: req.body
                }
            }
        };
    } catch (error) {
        console.log('Error fetching data:', error);
        return {
            props: {
                data: {
                    message: 'Failed to fetch data',
                    error: error.message || error.toString()
                }
            }
        };
    }
}



const ParichaySSO = ({ data }) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const checkUserData = useSelector((state) => state.checkUser?.data)
	console.log("data login", data,checkUserData)

	console.log('checkUserData', checkUserData)
	console.log("data login", router.query)





	useEffect(() => {
		if (data) {
			console.log('data', data)
			const extra = () => {}
			dispatch(checkUser({username : data?.email}, extra))
			
		}else{
			toast.error('User not mapped with SSO Admin')
			router.push("/");
		}
	}, []);
	useEffect(() => {
	  if(checkUserData){
		let response = setCookiesValues("userData ", {...data, ...checkUserData});
		if (response) {
			router.push("/dashboard");
		}
	  }
	}, [checkUserData])
	
	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Typography style={{ fontSize: 32 }} textAlign={"center"}>
				Please wait...
			</Typography>
			<Typography style={{ fontSize: 28 }} textAlign={"center"}>
				We are verifying your details
			</Typography>
			<LinearProgress variant="solid" />
		</Box>
	)
}

export default ParichaySSO
