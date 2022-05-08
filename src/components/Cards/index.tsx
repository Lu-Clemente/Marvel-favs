import React, { useState } from "react";
import { Modal, Image, ImageBackground, Dimensions } from 'react-native';
import Config from 'react-native-config';
import { Bio, Box, Close, CloseText, Container, Details, HeroName, ModalDetail, Name, SeeDetails, Stats, Wrapper } from "./styles";

type Props = {
    name: string;
    thumbnail?: string;
    extension?: string;
    description?: string;
}

const { width } = Dimensions.get("window");

const Card: React.FC<Props> = ({ name, thumbnail, extension, description }) => {

    // Modal Handling
    const [open, setOpen] = useState(false);
    const handleModal = () => {
        setOpen(!open)
    }

    return (
        <>
            {
                open ?
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
                                    <Bio>
                                        {
                                            description !== '' ?
                                                description :
                                                "No character's information..."
                                        }
                                    </Bio>
                                </Stats>

                                <Close onPress={handleModal}>
                                    <CloseText>close</CloseText>
                                </Close>
                            </Wrapper>
                        </ModalDetail>
                    </Modal>
                    : null
            }
            <Container>

                {
                    <ImageBackground
                        style={{ height: 245, width: (width / 2) - 50, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
                        source={{
                            uri: !thumbnail ? 'https://picsum.photos/id/71/500/300' : `${thumbnail}/portrait_uncanny.${extension}`,
                        }}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 35 }}
                    >
                        <Box>
                            <Name>{name}</Name>
                            <Details
                                onPress={handleModal}
                            >
                                <SeeDetails>view more</SeeDetails>
                            </Details>
                        </Box>

                    </ImageBackground>
                }

            </Container>
        </>
    );
}

export default Card;