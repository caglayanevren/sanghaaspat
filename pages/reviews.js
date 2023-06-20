const { Client } = require('@notionhq/client');
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Band from '../components/Band';
import CustomHead from '../components/CustomHead';
import Image from 'next/image';
import { Link, Flex, VStack, Box, Spacer, Heading, Text, Container, Button, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Avatar, chakra, Icon, useColorModeValue } from '@chakra-ui/react';
import { imagecontainer, firstSectionContainer } from '../styles/Reviews.module.scss';
import firstImage from '../public/images/reviews/reviews.jpg';
import en from '../locales/en';
import tr from '../locales/tr';

const testimonials = [
    {
        name: 'Görkem Orbay',
        roleTR: 'Diş Hekimi',
        roleEN: 'Dentist',
        contentTR:
            'Zeynep’le 2015 de tanıştım. O yeni bir yol seçmişti kendine. Merakla, hevesle anlatıyordu, öğretiyordu. O gün bugündür hayatımda Qi gong. Derken Sanghamıza kavuştuk. Burası yuva oldu bana, destek oldu, güç verdi. Sangha benim için aile demek, huzur demek, birliktelik demek. Bu öğreti benim hayatla olan bağımı, hayata karşı duruşumu değiştirdi. İyi ki yollarımız kesilmiş. Minnetle 🙏',
        contentEN:
            'I met Zeynep in 2015. She had chosen a new path for herself. Curiously, enthusiastically he was telling and teaching. That day is today Qi gong in my life. Then we got our Sangha. This place became my home, it supported me, it gave me strength. Sangha means family, peace, togetherness for me. This teaching has changed my connection with life, my attitude towards life. Glad our paths were cut off. gratefully',
        avatar: '/images/reviews/gorkem.jpg',
    },
    {
        name: 'Evren Çağlayan',
        roleTR: 'Web Developer',
        roleEN: 'Web Developer',
        contentTR:
            'Sangha, son 1 yıldır benim için huzur bulduğum bir kaçış noktası oldu. Devam ettiğim Qi Gong dersleriyle kendime dair bir çok yeni şey keşfetmenin yanında, çok güzel insanlarla da tanıştım. Sağlığınız ile ilgili yeni bakış açıları edinebileceğiniz bu sıcacık ortamı herkese tavsiye ederim.',
        contentEN:
            'Sangha has been an escape point for me for the last 1 year, where I find peace. In addition to discovering many new things about myself with the Qi Gong lessons I continued, I also met very nice people. I would recommend this warm environment to everyone, where you can gain new perspectives on your health.',
        avatar: '/images/reviews/evren.jpg',
    },
    {
        name: 'Serap Özbay',
        roleTR: 'Yapımcı',
        roleEN: 'Producer',
        contentTR:
            'Sevgili hocam Zeynep’le ve Qi Gong ile tanışmasaydım şimdi ne durumda olurdum tahmin edemiyorum! 2 yıl önce konulan Parkinson teşhisim sonrasında yapabileceğim en iyi sporlardan birinin Qi Gong olduğunu okudum birçok yabancı üniversite makalelerinde ve ben 1-0 önde başlamıştım bu mücadeleye. Sanırım 4 yıldan fazla oldu ilk tanışmamız. İlk başladığımızda çok yavaş gelen hareketler sıkıcı gibi olsa da sonunda çok iyi hissettiğim için içgüdülerim devam dedi. Zamanla, derinleşmeye başladıkça ne kadar önemli ve kıymetli bir şey yaptığımızı anladım. Özellikle de belli bir yaştan sonra başımıza gelebilecek olumsuzlukları önlemek için. Omuz, sırt ve diz ağrılarına veda ediyorsunuz zaten. Yıllarca gidilen fizyoterapilerin yerine bu kadar basit hareketlerle çözüm bulduğunuza inanamıyorsunuz. Parkinson olumsuz etkilerine yardımını saymıyorum bile…Bu arada hocamla beraber  Tayland’a gidip klinikte 2 haftalık dolu dolu çalışma şansım da oldu. Giderken yürümekte zorlanıyordum, dönüşteki farkı en çok beni gözlemleyen arkadaşlarım farketti ve inanamadılar! O zaman teşhisim henüz konulmamıştı. Sanırım Qi Qong sayesinde extra bir 2 yıl kazanmıştım. Merkezinde olmayı öğrenmek ve yıllar içinde edindiğimiz yanlış hareket alışkanlıklarımızı düzeltmek ne kadar kıymetli bir şey anlatmak zor. Ne kadar gecikmeden başlarsanız o kadar hayat kolaylaşacak ve kalitesi artacak. Hele ki Sangha Aspat gibi bir mekanda bu şansınız varsa dersleri sabısızlıkla bekliyorsunuz. Teşekkürler Zeynep’cim, sevgili hocam. İyi ki bu işe gönül verdin ve biz de arkandan geliyoruz.',
        contentEN:
            'I can’t imagine what situation I would be in now if I hadn’t met my dear teacher Zeynep and Qi Gong! After my Parkinson’s diagnosis 2 years ago, I read that one of the best sports I can do is Qi Gong in many foreign university articles and I started this struggle 1-0 ahead. I think it’s been more than 4 years since we first met. Even though the movements that were very slow when we first started, it seemed boring at the end, because I felt very good at the end, my instincts said to continue. Over time, as I began to deepen, I realized how important and valuable we were doing. Especially to prevent the negativities that may happen to us after a certain age. You are already saying goodbye to shoulder, back and knee pain. You cannot believe that you have found a solution with such simple movements instead of physiotherapy for years. Not to mention his help with the negative effects of Parkinson’s… By the way, I had the chance to go to Thailand with my teacher and work in the clinic for 2 weeks. I was having trouble walking on the way, my friends who observed me the most noticed the difference on the way back and couldn’t believe it! At that time I had not yet been diagnosed. I think I gained an extra 2 years thanks to Qi Qong. It is difficult to describe how valuable it is to learn to be at the center and correct the wrong habits of movement we have acquired over the years. The sooner you start, the more life will be easier and the quality will increase. Especially if you have this chance in a place like Sangha Aspat, you look forward to the lessons. Thank you Zeynep, my dear teacher. I’m glad you set your heart on this and we’re behind you.',
        avatar: '/images/reviews/serap.jpg',
    },
];

const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

function TestmonialCard(props) {
    const { name, roleTR, roleEN, contentTR, contentEN, avatar, locale, index } = props;
    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'md'}
            p={10}
            justifyContent={'space-between'}
            position={'relative'}
            bg={'gray.900'} //useColorModeValue('white', 'gray.800')
            _after={{
                content: '""',
                position: 'absolute',
                height: '21px',
                width: '29px',
                left: '35px',
                top: '-10px',
                backgroundSize: 'cover',
                backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
            }}
            _before={{
                content: '""',
                position: 'absolute',
                zIndex: '-1',
                height: 'full',
                maxW: '640px',
                width: 'full',
                filter: 'blur(40px)',
                transform: 'scale(0.98)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                top: 0,
                left: 0,
                backgroundImage: backgrounds[index % 4],
            }}
        >
            <Flex direction={'column'} textAlign={'left'} justifyContent={'space-between'}>
                <chakra.p pb={4}>{locale == 'en' ? contentEN : contentTR}</chakra.p>
                <chakra.p fontWeight={'bold'}>
                    {name}
                    <chakra.span fontWeight={'normal'}> - {locale == 'en' ? roleEN : roleTR}</chakra.span>
                </chakra.p>
            </Flex>
            <Avatar src={avatar} height={'80px'} width={'80px'} alignSelf={'center'} m={{ base: '0 0 35px 0', md: '0 0 0 50px' }} />
        </Flex>
    );
}

export default function Reviews(props) {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : tr;

    return (
        <Layout>
            <CustomHead pageName={process.env.reviews} locale={locale} />
            <Band />
            <Flex w={'full'} className={firstSectionContainer} paddingBottom={12} id="reviews">
                <VStack w={'full'} spacing={12}>
                    <Container maxW="container.xl" className={imagecontainer}>
                        <Image className={'image'} src={firstImage} alt={t.reviews.title} width={1280} height={461} priority={true} />
                    </Container>
                    <Box textAlign="center">
                        <Heading as="h2" fontWeight="400">
                            {t.reviews.title}
                        </Heading>
                        <Text mt={5} fontWeight="400">
                            {t.reviews.text}
                        </Text>
                    </Box>
                    <Container maxW="container.xl">
                        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'20'} mt={16} mx={'auto'}>
                            {testimonials.map((cardInfo, index) => (
                                <TestmonialCard key={index} {...cardInfo} index={index} locale={locale} />
                            ))}
                        </SimpleGrid>
                    </Container>
                    <Box>
                        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'white'}>
                            <path
                                fill={'currentColor'}
                                d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
                            />
                        </Icon>
                    </Box>
                </VStack>
            </Flex>
        </Layout>
    );
}
