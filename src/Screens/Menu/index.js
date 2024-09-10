import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Pressable, Switch } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from "../../Context/AuthContext";

export default function Profile() {
    const { user, fetchUserProfile, logout } = useAuth();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (user?.profile?.isopen !== undefined) {
            setIsEnabled(user.profile.isopen);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
    };

    if (!user) {
        // Exibir um carregamento ou uma mensagem de erro se o usuário não estiver definido
        return <Text>Carregando...</Text>;
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.profileHeader}>
                {user.profile.complite_profile ? (
                    <>
                        <Image
                            source={{ uri: user?.profile.image || 'https://via.placeholder.com/150' }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>{user.profile.nome || 'Nome do Usuário'}</Text>
                    </>
                ) : (
                    <View style={styles.btn}>
                        <Text>Completar cadastro</Text>
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.btnlistline}>
                    <View>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{user?.profile.email || 'email@example.com'}</Text>
                    </View>
                 
                </View>
                <View style={styles.btnlistline}>
                    <View> 
                    <Text style={styles.infoLabel}>Telefone:</Text>
                    <Text style={styles.infoValue}>{user?.profile.telefone || '(00) 00000-0000'}</Text>
                    </View>
                    <FontAwesome name="pencil-square-o" size={24} color="black" />
                </View>
                <View style={styles.btnlistline}>
                    <View>
                    <Text style={styles.infoLabel}>WhatsApp:</Text>
                    <Text style={styles.infoValue}>{user?.profile.whatsapp || '(00) 00000-0000'}</Text>
                    </View>
                    <FontAwesome name="pencil-square-o" size={24} color="black" />
              
                </View>

                {user.profile.useType === 'ADM' && (
                    <View style={styles.btnlistline}>
                        <View>
                            <Text style={styles.infoLabel}>Expediente:</Text>
                            <Text style={styles.infoValue}>{isEnabled ? 'Loja Aberta' : 'Loja Fechada'}</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                )}
                <View style={styles.btnlistline}>
                    <View>
                    <Text style={styles.infoLabel}>Endereço:</Text>
                    <Text style={styles.infoValue}>{user?.profile.endereco || 'Endereço não especificado'}</Text> 
                    </View>
                    <FontAwesome name="pencil-square-o" size={24} color="black" />
                </View>
                <View style={styles.btnlist}>
                    <Text style={styles.infoLabel}>Acessibilidade:</Text>
                    <Text style={styles.infoValue}>Configurações de acessibilidade</Text>
                </View>
                <View style={styles.btnlist}>
                    <Text style={styles.infoLabel}>Modo Escuro:</Text>
                    <Text style={styles.infoValue}>Configurações de modo escuro</Text>
                </View>
                <Pressable>
                    <View style={styles.btnlist}>
                        <Text style={styles.infoLabel}>Condições:</Text>
                        <Text style={styles.infoValue}>Termos de uso e privacidade</Text>
                    </View>
                </Pressable>
                <View style={styles.spacer} />
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        padding: 20,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    infoValue: {
        fontSize: 16,
        marginBottom: 15,
    },
    spacer: {
        flex: 1,
    },
    logoutButton: {
        backgroundColor: '#f00',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnlist: {
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(19, 19, 19, 0.5)",
        borderBottomStyle: 'solid',
        marginBottom: 6,
    },
    btnlistline: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(19, 19, 19, 0.5)",
        borderBottomStyle: 'solid',
        marginBottom: 6,
    },
});
