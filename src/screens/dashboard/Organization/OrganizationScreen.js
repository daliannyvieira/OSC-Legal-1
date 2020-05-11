// Libs
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

// Components
import Header from '../components/Header';
import ImageCaminho from '../../../assets/caminho.svg';
import ModalOrganization from './ModalOrganization';

// Image
import authorizationIcon from '../../../assets/authorization.svg';
import payIcon from '../../../assets/pay.svg';
import freeIcon from '../../../assets/free.svg';
import extendDeadlineIcon from '../../../assets/extendDeadline.svg';
import selectMaisMobile from '../../../assets/selectMais.svg';
// import Button from '../../../components/Button';

// Redux
const mapStateToProps = state => ({
	typeAccount: state.onboarding.users.typeAccount,
});

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 0 0 2rem;
	/* overflow: hidden; */
	overflow-x: hidden;
	overflow-y: scroll;
`;

const ContainerSelectedViewBy = styled.div`
	padding: 2rem 4.7rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 4;

	/* @media(max-width: 1024px) {
		padding: 3rem 3rem 0 4rem;
	} */

	@media (max-width: 768px) {
		padding: 2rem 4rem 0 4rem;
		align-items: center;
		flex-direction: column;
	}

	@media (max-width: 648px) {
		padding: 1rem 2rem 1rem 2rem;
	}
`;

const TitleManageOrgs = styled.h2`
	color: #85144B;
	font-size: 2rem;
	font-family: "Overpass", Black;
	font-weight: 900;

	@media (max-width: 648px) {
		display: none;
	}
`;

const SelectViewBy = styled.div`
	display: flex;
	flex-direction: row;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const SpanSelect = styled.div`
	width: 15rem;
	margin-top: 0.5rem;
	display: flex;
  flex-direction: column;
	position: relative;
	z-index: 2;

	@media (max-width: 940px) {
		width: 47%;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;

const TitleViewBy = styled.h2`
	color: #231F20;
	font-size: 1.125rem;
	font-family: Overpass;
	font-weight: bold;
	margin: 0.8rem 0.8rem 0 0;
	display: flex;
  align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;

const InputSelect = styled.div`
	width: 100%;
	background-color: #FFFFFF;
	border: 0.5px solid #85144B;
	border-radius: 3px 3px 0 0;
	color: #959595;
	font-size: 0.875rem;
	padding: 0.5rem;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	z-index: 2;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const SelectedViewByText = styled.p`
	width: 100%;
	color: ${props => (props.color === 'Selecionar status' ? '#959595' : '#85144B')};
	font-family: Overpass, Regular;
	padding-left: 0.3rem;
`;

const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: transparent;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
`;

const InputSelectedItem = styled.div`
	width: 100%;
	border: 0.5px solid #85144B;
	border-radius: 0 0 3px 3px;
	background-color: #FFFFFF;
	position: absolute;
	top: 32px;
	cursor: pointer;
`;

const SelectedItem = styled.p`
	font-size: 0.9rem;
	color: #85144B;
	font-family: Overpass, Regular;
	padding: 0.4rem;

	&:hover {
		background-color: #FFCFCD;
		border: 0.5px solid #85144B;
	}

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const Table = styled.table`
	/* display: flex;
	flex-direction: column; */
	width: 100%;
	max-width: 100%;
	height: calc(100vh - 161px);
	border-spacing: 0;
	padding: 1.5rem 4.7rem 0;
	/* overflow-x: hidden;
	overflow-y: scroll; */

	@media (max-width: 768px) {
		padding: 2rem 0 0 0;
	}

	@media (max-width: 648px) {
		padding: 0;
		padding-top: 1rem;
		${({ modal }) => modal && css`
			display: none;
		`}
	}
`;

const Thead = styled.thead`
	text-align: left;

	@media (max-width: 768px) {
		display: none;
	}
`;

const Tr = styled.tr`
	height: 2.3rem;
	padding-left: 0.7rem;
	position: relative;
	cursor: pointer;

	&:nth-child(even) {
    background-color: #FFCFCD;
  }
	&:nth-child(odd) {
    background-color: #FFFFFF;
	}

	@media(max-width: 768px) {
		/* margin-bottom: 1rem; */
		padding: 1rem 1rem 10rem 1rem;
		display: flex;
    flex-wrap: wrap;
	}
	@media(max-width: 648px) {
		padding: 1rem 1rem 12.5rem 1rem;
	}

	@media(max-width: 420px) {
		padding: 1rem 1rem 16rem 1rem;
	}
`;

const TableTitle = styled.th`
	/* width: 5rem; */
	background-color: #85144B;
	color: #FFFFFF;
	font-size: 1rem;
	font-family: Overpass, Regular;
	text-align: ${props => (props.center === 'Status' && 'center')};
	padding-left: 0.7rem;

	@media (max-width: 768px) {
		display: none;
	}
`;

const ImageMore = styled.img`
	display: none;

	@media(max-width: 648px) {
		display: flex;
		position: absolute;
		right: 15px;
	}
`;

const ContainerTableTitleMob = styled.span`
	display: none;

	@media (max-width: 768px) {
		padding-right: 1rem;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;

		${({ selected }) => selected && css`
		/* img {display: block;} */
		p {display: none;}
		div {display: flex;}
	`}
	}
`;

const TextNoOrganitazion = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 4rem;
`;

const TextInformation = styled.p`
	font-size: 2rem;
	text-align: center;

	@media(max-width: 648px) {
		font-size: 1.5rem;
	}
`;

const Box = styled.div`
	display: none;
	flex-direction: row;

	@media(max-width: 768px) {
		display: ${props => (props.isClickedStatus ? 'flex' : 'none')};
	}
`;

const BoxButton = styled.button`
	width: 100%;
	height: 100%;
	border: none;
	background: none;
`;

const TableTitleMob = styled.th`
	display: none;

	@media(max-width: 768px) {
		display: flex;
		color: #85144B;
		font-size: 1rem;
		font-family: Overpass, Regular;
	}
`;

const TableList = styled.td`
	color: #404040;
	font-family: "Overpass", Light;
	/* font-family: ${props => (props.font ? '"Overpass", Light' : 'Overpass, SemiBold')}; */
	font-weight: ${props => (props.font ? 'Bold' : '0')};
	font-size: 0.95rem;
	padding: 0.5rem;

	@media (max-width: 768px) {
		padding: 0.5rem 0;
		display: ${props => (props.mob ? 'none' : 'flex')};
	}
`;

const ContainerStatus = styled.td`
	width: 6rem;
	padding: 0.5rem;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: ${props => (props.desc ? 'flex-start' : 'space-evenly')};

	${({ selected }) => selected && css`
		img {display: block}
		p {display: none}
		div {display: flex}
	`}

	@media(max-width: 768px) {
		padding: 0;
	}
`;

const TextStatus = styled.p`
	color: ${props => (props.color)};
	font-size: 0.8rem;

	text-transform: uppercase;

	@media(max-width: 768px) {
		display: ${props => (props.isClickedName ? 'none' : 'flex')};
	}
`;

const ImageStatus = styled.img`
	width: 1.3rem;
  padding-right: 0.3rem;
	display: none;
	cursor: pointer;

	@media(max-width: 768px) {
		display: flex;
	}
`;

class OrganizationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: undefined,
			isModal: undefined,
			itemSelected: undefined,
			isSelected: undefined,
			selectedValue: 'Selecionar status',
			selectedItems: [
				'Selecionar status',
				{ select: 'Pendente de Autorização', filter: 'autorizar' },
				{ select: 'Pendente de Pagamento', filter: 'pendente' },
				'Isento',
				'Pago',
				'Vencido',
			],
			redirect: 'organization',
			tableTitles: [
				'Organização',
				'CPF',
				'Usuário',
				'E-mail',
				'Telefone',
				'Criado em',
				'Autorização',
				'Vencimento',
				'Status',
			],
			tableDatas: [
				{
					id: 1,
					organization: 'Instituto PrecisaSer',
					cpf: '000.000.000-00',
					user: 'Jorge Amado da Silva',
					email: 'organização@email.com',
					telephone: '(11)11111-1111',
					createdIn: '19/05/19',
					authorization: '-',
					dueDate: '-',
					status: 'autorizar',
					admin:
					{
						name: 'Jorge Amado da Silva',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Instituto PrecisaSer',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 2,
					organization: 'Vai na Web',
					cpf: '000.000.000-00',
					user: 'Yasmin Miranda',
					email: 'nome@email.com',
					telephone: '(99) 99999-9999',
					createdIn: '18/06/19',
					authorization: '-',
					dueDate: '-',
					status: 'autorizar',
					admin:
					{
						name: 'Yasmin Miranda',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Instituto PrecisaSer',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 3,
					organization: 'Casa de Rui Barbosa',
					cpf: '000.000.000-00',
					user: 'Alice Barbosa Souza',
					email: 'organização@email.com',
					telephone: '(77)77777-7777',
					createdIn: '17/06/19',
					authorization: '02/06/19',
					dueDate: '02/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Alice Barbosa Souza',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Casa de Rui Barbosa',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 4,
					organization: 'Biblioteca da Maré',
					cpf: '000.000.000-00',
					user: 'Vinicius Almeida Rodrigues',
					email: 'organização@email.com',
					telephone: '(22)22222-2222',
					createdIn: '15/06/19',
					authorization: '15/07/19',
					dueDate: '-',
					status: 'autorizar',
					admin:
					{
						name: 'Vinicius Almeida Rodrigues',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Biblioteca da Maré',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 5,
					organization: 'Museu de Arte ZO',
					cpf: '000.000.000-00',
					user: 'Tarcila do Amaral Gonçalves',
					email: 'organização@email.com',
					telephone: '(44)44444-4444',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Tarcila do Amaral Gonçalves',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Museu de Arte ZO',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 6,
					organization: 'Instituto Tamar',
					cpf: '000.000.000-00',
					user: 'Aline Candido Mendes',
					email: 'organização@email.com',
					telephone: '(55)55555-5555',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Aline Candido Mendes',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Instituto Tamar',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 7,
					organization: 'Projeto Vida',
					cpf: '000.000.000-00',
					user: 'Ronaldo Veiga de Almeida',
					email: 'organização@email.com',
					telephone: '(66)66666-6666',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Ronaldo Veiga de Almeida',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Projeto Vida',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 8,
					organization: 'Mais Brasil',
					cpf: '000.000.000-00',
					user: 'Ana Claudia Ferrari Silva',
					email: 'organização@email.com',
					telephone: '(77)77777-7777',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Ana Claudia Ferrari Silva',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Mais Brasil',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 9,
					organization: 'Pela Vida',
					cpf: '000.000.000-00',
					user: 'Marcio Rodrigues Alves',
					email: 'organização@email.com',
					telephone: '(88)88888-8888',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Marcio Rodrigues Alves',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Pela Vida',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 10,
					organization: 'Casa azul',
					cpf: '000.000.000-00',
					user: 'João Marcos Barbosa',
					email: 'organização@email.com',
					telephone: '(99)99999-9999',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'João Marcos Barbosa',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Casa azul',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 11,
					organization: 'Coletivo Denegrir',
					cpf: '000.000.000-00',
					user: 'Caroline Perreira',
					email: 'organização@email.com',
					telephone: '(21)23659-8799',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Caroline Perreira',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Coletivo Denegrir',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
				{
					id: 12,
					organization: 'Crianças Felizes',
					cpf: '000.000.000-00',
					user: 'Alice Barbosa Souza',
					email: 'organização@email.com',
					telephone: '(21)98956-7856',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'autorizar',
					admin:
					{
						name: 'Alice Barbosa Souza',
						rg: '12.526.759-3',
						dateOfBirth: '10/10/10',
						fantasyName: 'Vai na Web',
						reasonSocial: 'Crianças Felizes',
						cnpj: '00.000.000/0000-00',
						address: 'Rua Gomes Lopes',
						complement: 'Casa',
						neighborhood: 'Santa Teresa',
						cep: '20241-410',
						city: 'Rio de Janeiro',
					},
				},
			],

			statusImgs: [
				{
					img: authorizationIcon,
					desc: 'Autorizar',
				},
				{
					img: payIcon,
					desc: 'Pago',
				},
				{
					img: freeIcon,
					desc: 'Isento',
				},
				{
					img: extendDeadlineIcon,
					desc: 'Prorrogar Prazo',
				},
			],
			selectedStatusImgs: undefined,
			selectedStatusOrg: undefined,
		};
	}

	isModalOpen = (item) => {
		this.setState({
			itemSelected: item,
			isModal: !this.state.isModal,
		});
	}

	isSelectOpen = (event) => {
		event.stopPropagation();
		this.setState({
			isSelected: !this.state.isSelected,
		});
	}

	handleSelectedValue = (item) => {
		this.setState({
			selectedValue: item,
			isSelected: false,
		});
	}

	handleClick = (item) => {
		this.setState({
			redirect: item,
		});
	};

	handleSelectedStatus = (newStatus, item) => {
		const { tableDatas } = this.state;
		const newList = tableDatas.map((data) => {
			if (data === item) {
				return {
					...data,
					status: newStatus.desc,
					isChanged: true,
				};
			}
			return data;
		});
		this.setState({
			isClickedStatus: '',
			tableDatas: newList,
		});
	}

	handleClickedImageStatus = (item) => {
		this.setState({
			isClickedStatus: item.id,
		});
	};

	renderSelectedViewby = () => (
		<ContainerSelectedViewBy>
			{this.props.typeAccount === 'admin'
				? <TitleManageOrgs>Gerenciar organizações</TitleManageOrgs>
				: <h1>Minhas organizações</h1>
			}
			<SelectViewBy>
				{this.props.typeAccount === 'admin'
					? <TitleViewBy>Visualizar por:</TitleViewBy>
					: <p>Pesquisar</p>
				}
				<SpanSelect>
					<InputSelect onClick={this.isSelectOpen}>
						<SelectedViewByText color={this.state.selectedValue.select || this.state.selectedValue}>
							{this.state.selectedValue.select || this.state.selectedValue}
						</SelectedViewByText>
						<img src={ImageCaminho} alt="arrow" />
					</InputSelect>
					{this.state.isSelected && (
						<InputSelectedItem>
							{this.state.selectedItems.map((item, index) => (
								<SelectedItem
									onClick={() => this.handleSelectedValue(item)}
									key={index}
									hover={item}
								>
									{item.select || item}
								</SelectedItem>
							))}
						</InputSelectedItem>
					)}
				</SpanSelect>
			</SelectViewBy>
		</ContainerSelectedViewBy>
	)

	renderStatus = item => (
		<>
			<Box isClickedStatus={item.id === this.state.isClickedStatus}>
				{this.state.statusImgs.map((status, index) => (
					<ImageStatus
						key={index}
						src={status.img}
						alt={status.desc}
						onClick={() => this.handleSelectedStatus(status, item)}
					/>
				))}
			</Box>
			<BoxButton onClick={() => this.handleClickedImageStatus(item)}>
				<TextStatus color={item.isChanged ? '#FF4136' : '#85144B'}
					isClickedName={item.id === this.state.isClickedStatus}
				>
					{item.status}
				</TextStatus>
			</BoxButton>
		</>
	)

	renderTable = (listTable) => {
		const widthMob = (window.matchMedia('(max-width: 768px)').matches);

		return listTable.map(item => (
			<Tr key={item.organization}>
				{widthMob
					? <ContainerTableTitleMob>
						<TableTitleMob>Organização</TableTitleMob>
						<TableList>{item.organization}</TableList>
					</ContainerTableTitleMob>
					: <>
						<TableList font={this.state.hovered === item} onClick={() => this.isModalOpen(item)}>{item.organization}</TableList>
					</>
				}
				<TableList font={this.state.hovered === item} mob>{item.cpf}</TableList>
				<TableList font={this.state.hovered === item} mob>{item.user}</TableList>
				{widthMob
					? <> <ContainerTableTitleMob>
						<TableTitleMob>E-mail</TableTitleMob>
						<TableList>{item.email}</TableList>
					</ContainerTableTitleMob>
					<ContainerTableTitleMob>
						<TableTitleMob>Telefone</TableTitleMob>
						<TableList font={this.state.hovered === item}>{item.telephone}</TableList>
					</ContainerTableTitleMob>
					<ContainerTableTitleMob>
						<TableTitleMob>Criado em</TableTitleMob>
						<TableList font={this.state.hovered === item}>{item.createdIn}</TableList>
					</ContainerTableTitleMob>
					<ContainerTableTitleMob>
						<TableTitleMob>Autorização</TableTitleMob>
						<TableList font={this.state.hovered === item}>{item.authorization}</TableList>
					</ContainerTableTitleMob>
					<ContainerTableTitleMob>
						<TableTitleMob>Vencimento</TableTitleMob>
						<TableList font={this.state.hovered === item}>{item.dueDate}</TableList>
					</ContainerTableTitleMob>
					</>
					: <>
						<TableList font={this.state.hovered === item} onClick={() => this.isModalOpen(item)}>{item.email}</TableList>
						<TableList font={this.state.hovered === item} onClick={() => this.isModalOpen(item)}>{item.telephone}</TableList>
						<TableList font={this.state.hovered === item}>{item.createdIn}</TableList>
						<TableList font={this.state.hovered === item}>{item.authorization}</TableList>
						<TableList font={this.state.hovered === item}>{item.dueDate}</TableList>
					</>
				}
				{widthMob
					? <ContainerTableTitleMob
					// selected={this.state.hovered === item}
					>
						<TableTitleMob center>Status</TableTitleMob>
						{this.renderStatus(item)}
					</ContainerTableTitleMob>
					: <>
						<ContainerStatus
							onMouseEnter={() => this.setState({ hovered: item })}
							onMouseLeave={() => this.setState({ hovered: undefined })}
							selected={this.state.hovered === item}
						>
							{this.renderStatus(item)}
						</ContainerStatus>
					</>
				}
				<ImageMore src={selectMaisMobile} onClick={() => this.isModalOpen(item)}/>
			</Tr>
		));
	}

	renderAllTable = () => {
		const { tableDatas, selectedValue } = this.state;
		let listTable = this.renderTable(tableDatas);
		if (
			selectedValue !== 'Selecionar status'
		) {
			listTable = this.renderTable(tableDatas.filter(item => item.status === (selectedValue.filter || selectedValue)));
		}
		return listTable;
	}

	render() {
		return (
			<Container>
				{/* {this.props.typeAccount === 'admin'
					? <button> - </button>
					: <button> Criar Organização </button>
				} */}
				{this.state.isSelected && <Overlay onClick={this.isSelectOpen} />}
				{this.state.isModal
				&& <ModalOrganization item={this.state.itemSelected} handleClosedModal={this.isModalOpen} />
				}
				<Header />
				{this.renderSelectedViewby()}
				<Table modal={this.state.isModal}>
					<Thead>
						<Tr>
							{this.state.tableTitles.map(title => (
								<TableTitle key={title} center={title}>{title}</TableTitle>
							))}
						</Tr>
					</Thead>
					<tbody>
						{this.renderAllTable()}
					</tbody>
				</Table>
				{this.renderAllTable().length === 0 && (
					<TextNoOrganitazion>
						<TextInformation>Não há organizações.</TextInformation>
					</TextNoOrganitazion>
				)}
			</Container>
		);
	}
}

export default connect(mapStateToProps, null)(OrganizationScreen);
