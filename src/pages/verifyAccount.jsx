import { useState, useContext, useEffect, useMemo } from "react"
import { AuthContext } from "../contexts/authContexts"
import { WalletContext } from "../contexts/walletContexts"
import { ArrowLeft, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import moment from 'moment';

const VerifyAccountPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isTokenValid, token, user, fetchUserData } = useContext(AuthContext)
    const { verifyNIN, verifyBVN } = useContext(WalletContext)

    const [verificationMethod, setVerificationMethod] = useState('nin')
    const [verificationNumber, setVerificationNumber] = useState('')
    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)


    useEffect(() => {
        if (!isAuthenticated || !isTokenValid(token)) {
            toast.error("Session expired. Please login again.")
            navigate("/login")
        }
    }, [isAuthenticated, token, navigate, isTokenValid])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log('Details', verificationMethod, verificationNumber, name, dateOfBirth, mobileNumber);

            // Validation for verification number length
            if (verificationNumber.length !== 11) {
                toast.error("Verification number must be 11 digits.");
                return;
            }

            let response;

            if (verificationMethod === 'nin') {
                response = await verifyNIN(verificationNumber);
                console.log('NIN response', response);
            } else if (verificationMethod === 'bvn') {

                const dateString = dateOfBirth;
                const formattedDate = moment(dateString, "YYYY-MM-DD").format("DD-MMM-YYYY");
                console.log(formattedDate); // Output: 06-Nov-1998

                console.log('formated dob', formattedDate);


                response = await verifyBVN(verificationNumber, name, formattedDate, mobileNumber);

                console.log('BVN response', response);

                await fetchUserData
                
            } else {
                toast.error("Invalid verification method selected.");
                return;
            }

            // If successful
            // toast.success("Account verified successfully!");
            navigate('/fund-wallet');
        } catch (error) {
            console.error('Verification error:', error);
            toast.error("Verification failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="sticky top-0 z-10 bg-white border-b">
                <div className="container flex items-center h-14 px-4 max-w-xl mx-auto">
                    <button onClick={() => navigate('/fund-wallet')} className="mr-3">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <h1 className="text-xl font-semibold">Verify Account</h1>
                </div>
            </header>

            <main className="flex-grow container max-w-xl mx-auto p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            Account Verification
                        </CardTitle>
                        <CardDescription>
                            As per CBN regulations, we need to verify your identity to ensure the security of your account and comply with anti-money laundering policies.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="verificationMethod">Verification Method</Label>
                                <Select
                                    onValueChange={(value) => setVerificationMethod(value)}
                                    defaultValue="nin"
                                >
                                    <SelectTrigger id="verificationMethod">
                                        <SelectValue placeholder="Select verification method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nin">National Identification Number (NIN)</SelectItem>
                                        <SelectItem value="bvn">Bank Verification Number (BVN)</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>

                            {verificationMethod === 'nin' ? (
                                <div className="space-y-2">
                                    <Label htmlFor="nin">NIN Number</Label>
                                    <Input
                                        id="nin"
                                        placeholder="Enter your NIN"
                                        value={verificationNumber}
                                        onChange={(e) => setVerificationNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            ) : (

                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="bvn">BVN Number</Label>
                                        <Input
                                            id="bvn"
                                            placeholder="Enter your BVN"
                                            value={verificationNumber}
                                            onChange={(e) => setVerificationNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                        <Input
                                            id="dateOfBirth"
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                                        <Input
                                            id="mobileNumber"
                                            placeholder="Enter your mobile number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <div className="text-sm text-muted-foreground">
                                <p>Why we need this information:</p>
                                <ul className="list-disc list-inside space-y-1 mt-2">
                                    <li>To comply with CBN Know Your Customer (KYC) regulations</li>
                                    <li>To protect your account from unauthorized access</li>
                                    <li>To enable higher transaction limits on your account</li>
                                    <li>To facilitate seamless inter-bank transactions</li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Verify Account"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    )
}

export default VerifyAccountPage

