import { setCookiesValues } from '@/utils/cookies';
import { Box, LinearProgress, Typography } from '@mui/material';
import axios from 'axios'
import bodyParser from 'body-parser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
export async function getServerSideProps(context) {
	const { req } = context;

	await new Promise((resolve, reject) => {
		bodyParser.urlencoded({ extended: true })(req, null, resolve);
	});

	const {
		token ,
		user_id 
	} = req?.body;
	return {
	  props: {
	data : {token : token || "",
		user_id : user_id || ""} },
	};
  }
  


const ParichaySSO = ({data}) => {
	const router = useRouter()
console.log("data login", data)
	useEffect(() => {
		
		if(data){
			let response = setCookiesValues("userData", data);

			if (response) {
				router.push("/dashboard");
			}
		}
	}, []);
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
