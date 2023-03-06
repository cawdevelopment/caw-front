import { useEffect, useState } from "react";
import { Box, Button, Divider, HStack, IconButton, Progress, Stack, Textarea, Tooltip, useColorModeValue, useToken, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { MotionContainer } from "src/components/animate";
import MyAvatar from 'src/components/contract/avatars/MyAvatar';
import CircularProgress from 'src/components/CircularProgress';
import Iconify from 'src/components/icons/Iconify';
import { useToast } from 'src/hooks';

export const MAX_CHARECTERS = 420;

export default function NewPost() {

    const { t } = useTranslation();
    const { colorMode } = useColorMode();
    const [light, dark] = useToken('colors', ['caw.600', 'caw.500']);
    const iconColor = useColorModeValue(light, dark);
    const okColor = useColorModeValue('caw.500', 'caw.600');
    const warningColor = useColorModeValue('orange.500', 'orange.400');
    const errorColor = useColorModeValue('red.500', 'red.400');
    const toast = useToast()
    const [characters, setCharacters] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(characters >= MAX_CHARECTERS ? 100 : (characters / MAX_CHARECTERS) * 100);
    }, [characters]);

    const handlePost = () => {
        toast.closeAll();
        toast({
            title: t('new_post.yettodone_title'),
            description: t('new_post.yettodone_desc'),
            status: 'info',
            variant: colorMode === 'dark' ? "solid" : 'subtle',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
        });
    }

    const progressColor = progress < 90 ? okColor : progress < 96 ? warningColor : progress < 100 ? errorColor : errorColor;

    return (
        <MotionContainer>
            <Box sx={{ m: 2, py: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={4}>
                    <MyAvatar sx={{ display: { base: 'none', sm: 'block' } }} />
                    <Textarea
                        autoFocus
                        resize="none"
                        placeholder={t('labels.new_post_plh')}
                        inputMode="text"
                        maxLength={MAX_CHARECTERS}
                        height={110}
                        onChange={(e) => setCharacters(e.target.value.length)}
                    />
                </Stack>
                <Progress
                    ml={0}
                    mt="2"
                    size="xs"
                    colorScheme="caw"
                    borderRadius="full"
                    display={{ base: 'flex', sm: 'none' }}
                    value={progress}
                />
                <HStack
                    alignItems="center"
                    ml={{ base: 0, sm: 14 }}
                    mt="2"
                    alignContent="space-between"
                >
                    <Tooltip
                        hasArrow
                        label={t('labels.add_photo')}
                    >
                        <IconButton variant="ghost" aria-label={t('labels.add_photo')} >
                            {<Iconify icon={'bxs:image'} width={20} height={20} color={iconColor} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        hasArrow
                        label={t('labels.add_gif')}>
                        <IconButton variant="ghost" aria-label={t('labels.add_gif')} >
                            {<Iconify icon={'fluent:gif-24-filled'} width={20} height={20} color={iconColor} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        hasArrow
                        label={t('labels.add_video')}>
                        <IconButton variant="ghost" aria-label={t('labels.add_video')} >
                            {<Iconify icon={'bxs:video'} rotate={180} width={20} height={20} color={iconColor} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        hasArrow
                        label={t('labels.add_link')}>
                        <IconButton variant="ghost" aria-label={t('labels.add_link')} >
                            {<Iconify icon={'majesticons:link-circle'} rotate={180} width={20} height={20} color={iconColor} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        hasArrow
                        label={t('labels.add_long_caw')}>
                        <IconButton variant="ghost" aria-label={t('labels.add_long_caw')} >
                            {<Iconify icon={'akar-icons:circle-plus-fill'} rotate={180} width={20} height={20} color={iconColor} />}
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        alignItems={{ base: 'flex-start', sm: 'center' }}
                    >
                        <CircularProgress
                            capIsRound
                            color={progressColor}
                            value={progress}
                            text={`${Math.round(progress || 0)}%`}
                            display={{ base: 'none', sm: 'flex' }}
                        />
                        <Tooltip
                            hasArrow
                            label={t('buttons.btn_caw_tooltip')}
                        >
                            <Button
                                variant="contained"
                                bg="caw.600"
                                color={'gray.900'}
                                size='sm'
                                boxShadow='2xl'
                                onClick={handlePost}
                            >
                                CAW
                            </Button>
                        </Tooltip>
                    </Stack>
                </HStack>
                <Divider m={2} />
            </Box>
        </MotionContainer>
    );
}