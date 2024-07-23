import { setCookiesValues } from '@/utils/cookies';
import { Box, LinearProgress, Typography } from '@mui/material';
import axios from 'axios'
import bodyParser from 'body-parser';import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
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

        return {
            props: {
                data: {
                    token: token || "",
                    user_id: user_id || ""
                }
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
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
	console.log("data login", data)

	console.log("data login", router.query)



	useEffect(() => {
		if (data) {
			console.log('data', data)
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
