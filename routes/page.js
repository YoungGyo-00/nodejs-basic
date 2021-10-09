const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

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


router.get('/', async(req,res,next) => {
	try {
		const twits = []
		const posts = await Post.findAll({
			include: {
				model: User,
				attributes: ['id', 'nick'],
			},
			order: [['createdAt', 'DESC']],
		})
		res.render('main',{
		title: 'NodeBird',
		twits: posts,
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;