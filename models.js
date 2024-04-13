import { Sequelize, DataTypes, Deferrable } from "sequelize"
import 'dotenv/config'

const URI_DATABASE = process.env.URI_DATABASE
const sequelize = new Sequelize(URI_DATABASE)

export const Instalacao = sequelize.define('Instalacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    nome: {
        type: DataTypes.STRING
    }, 
    endereco: {
        type: DataTypes.STRING
    },
    tipoLocal: {
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.BIGINT
    },
    email: {
        type: DataTypes.STRING
    }
})

export const Setor = sequelize.define('Setor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    instalacao_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Instalacao,
            key: Instalacao.id,
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    nome: {
        type: DataTypes.STRING
    }
})

export const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    setor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Setor,
            key: Setor.id,
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    nome: {
        type: DataTypes.STRING,
    },
    telefone: {
        type: DataTypes.BIGINT
    },
    email: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
})

export const EnergiaConsumida = sequelize.define('EnergiaConsumida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: Cliente.id,
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    energiaConsumida: {
        type: DataTypes.INTEGER
    }
})

export const PainelSolar = sequelize.define('PainelSolar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: Cliente.id,
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    capacidadeGeracao: {
        type: DataTypes.INTEGER
    }
})

export const EnergiaGerada = sequelize.define('EnergiaGerada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    painelSolar_id: {
        type: DataTypes.INTEGER,
        references: {
            model: PainelSolar,
            key: PainelSolar.id,
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    energiaGerada: {
        type: DataTypes.INTEGER
    },
    temperaturaMomento: {
        type: DataTypes.FLOAT
    }
})

export const EnergiaArmazenada = sequelize.define('EnergiaArmazenada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    energiaArmazenada: {
        type: DataTypes.INTEGER
    }
})

