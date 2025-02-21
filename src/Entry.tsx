import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import RootProviders from "./providers/RootProviders.tsx";
import Layouts from "./layouts/RootLayout.tsx";
import {BrowserRouter} from "react-router";
import {Routes} from "./routes/Routes.tsx";

createRoot(document.getElementById('root')!).render(<Root/>)

export function Root() {
	return (
		<StrictMode>
			<BrowserRouter>
				<RootProviders>
					<Layouts>
						<Routes/>
					</Layouts>
				</RootProviders>
			</BrowserRouter>
		</StrictMode>
	)
}