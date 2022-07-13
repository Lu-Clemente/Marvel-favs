import React, { useState } from "react";
import {
    Dimensions, Image, ImageBackground,
    Modal, ScrollView
} from "react-native";
import {
    Bio, Box, Close, CloseText,
    Container, HeroName,
    ModalDetail, Name, SeeDetails,
    Stats, Wrapper
} from "./styles";

type Props = {
    name: string;
    thumbnail?: string;
    extension?: string;
    description?: string;
}

const { width, height } = Dimensions.get("window");

const HeroBanner: React.FC<Props> = ({
    name,
    thumbnail,
    extension,
    description,
}) => {

    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!open)
    }

    return (
        <>
            {
                open &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={open}
                    onRequestClose={handleModal}
                    style={{ width: "100%", height: "100%" }}
                >
                    <ModalDetail>
                        <Wrapper>
                            <Image
                                style={{ height: 180, width: '100%', borderTopLeftRadius: 35, borderTopRightRadius: 35 }}
                                source={{
                                    uri: !thumbnail ? 'https://picsum.photos/id/71/500/300' : `${thumbnail}/landscape_large.${extension}`,
                                }}
                                resizeMode="cover"
                            />

                            <Stats>
                                <HeroName>{name}</HeroName>
                                <ScrollView>
                                    <Bio>
                                        {
                                            description !== '' ?
                                                description :
                                                "No character's information..."
                                        }
                                    </Bio>
                                </ScrollView>
                            </Stats>

                            <Close onPress={handleModal}>
                                <CloseText>close</CloseText>
                            </Close>
                        </Wrapper>
                    </ModalDetail>
                </Modal>
            }

            <Container>
                <ImageBackground
                    style={{ height: height * 60 / 100, width: width - 50, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
                    source={{
                        uri: !thumbnail ? 'https://picsum.photos/id/71/500/300' : `${thumbnail}/portrait_uncanny.${extension}`,
                    }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 35 }}
                >
                    <Box onPress={handleModal}>
                        <Name>{name}</Name>
                        <SeeDetails>view more</SeeDetails>
                    </Box>

                </ImageBackground>
            </Container>
        </>
    )
}

export default HeroBanner;