import React, { useEffect, useState } from "react";
import { Modal, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Bio, Box, Close, CloseText, Container, Details, Fav, HeroName, ModalDetail, Name, SeeDetails, Stats, Wrapper } from "./styles";

type Props = {
    name: string;
    thumbnail?: string;
    extension?: string;
    description?: string;
    characterId: number;
    updateFavoritesDB: (value: number, action: "add" | "remove") => Promise<void>;
    isFav: boolean;
}

const { width } = Dimensions.get("window");

const Card: React.FC<Props> = ({
    name,
    thumbnail,
    extension,
    description,
    characterId,
    updateFavoritesDB,
    isFav
}) => {

    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!open)
    }

    const handleStar = () => {
        if (isFav) {
            return (
                <Fav style={{ elevation: 8 }} onPress={() => updateFavoritesDB(characterId, "remove")}>
                    <Icon
                        name='star'
                        type='font-awesome'
                        color='#fbff00'
                        size={25}
                        tvParallaxProperties={undefined}
                    />
                </Fav>
            )
        } else {
            return (
                <Fav style={{ elevation: 8 }} onPress={() => updateFavoritesDB(characterId, "add")}>
                    <FontAwesomeIcon
                        icon={faStar}
                        color="#fbff00"
                        size={25}
                    />
                </Fav>
            )
        }
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

                                {handleStar()}

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