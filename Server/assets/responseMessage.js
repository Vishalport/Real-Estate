module.exports = {

	// PROPERTY responseMessage............
	OTP_SEND: 'OTP has been sent successfully on register email. ',
	OTP_EXPIRED: 'OTP expired.',
	INCORRECT_OTP: 'Incorrect OTP.',
	BLOCK_BY_ADMIN: 'You have been blocked by admin.',
	DELETE_BY_ADMIN: 'Your account has been deleted by admin.',
	NO_TOKEN: 'Please provide token.',
	NO_IMG: 'Please provide Photo.',
	LOGIN: 'Login successfully.',
	OTP_VERIFY: 'OTP verified successfully.',
	USER_ALREADY_EXIST: 'User already exist.',
	USER_NOT_FOUND: 'User not found.',
	INCORRECT_LOGIN : "Incorrect Credentials Provided",
	OTP_NOT_VERIFYED : "Credentials OTP not Verifyed",
	PROFILE_UPDATED: 'Profile updated successfully.',
	USER_EXISTS: 'User exists found successfully.',
	MOBILE_EXIST: 'This mobile number already exists.',
	EMAIL_EXIST: 'This email already exists.',
	USER_DETAILS: 'Profile details found successfully.',
	USER_CREATED: 'User created successfully.',
	NOT_MATCH: 'Password and confirm password does not match',
	PWD_NOT_MATCH : "Old Password Don't match",
	PWD_CHANGED : "Password Updated successfully",


	// PROPERTY responseMessage............
	PROPERTY_ALREADY_ADD : "Property is already exist.",
	PROPERTY_ADD : "Property Created successfully",
	PROPERTY_NOT_FOUND : "Property Not found",
	PROPERTY_FOUND : "Property found",
	NOT_WISHLIST : "Unable to wishlist the Property",
	WISHLIST : "Wishlist the Property",
	WISHLIST_REMOVED : "Removed Property Wishlist",
	WISHLIST_NOT_FOUND :  "Wishlist not found",
	WISHLIST_FOUND : "Wishlist found",


	// Message Managment....................
	MESSAGE_CRATED : "Message sent successfully",





	SMS_BODY: (otp) => `Your verification code is  ${otp}`,
	REFER_SMS_BODY: (first_name, last_name, referral_code, iosLink, androidLink, webLink) => `${first_name} ${last_name} wants to refer you on PayPenny application. 
	Please use ${referral_code} as the referral code. Website Link : ${webLink}, Android Link : ${androidLink}, IOS Link : ${iosLink}`
};
