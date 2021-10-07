const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req,res,next) => {
	res.locals.user = req.user; // passport deserializeUser 요철 => req.session에 저장된 id로 db 조회
	res.locals.followerCount = 0;
	res.locals.followingCount = 0;
	res.locals.followerIdList = [];
});

router.get('/profile', isLoggedIn, (req,res) =>{
	res.render('profile', { title: '내 정보 - NodeBird'});
}); // 로그인 상태에서만 실행

router.get('/join', isNotLoggedIn, (req,res) =>{
	res.render('join',{title: '회원가입'});
}); // 로그인 안된 상태에서만 실행

router.get('/',(req,res) =>{
	const twits = [];
	res.render('main',{
		title: 'NodeBird',
		twits,
	});
});

module.exports = router;