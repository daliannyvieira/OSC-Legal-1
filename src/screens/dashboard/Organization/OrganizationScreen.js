// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import Header from '../components/Header';
import ImageCaminho from '../../../assets/caminho.svg';
import ModalOrganization from './ModalOrganization';
import DocumentsScreen from '../Documents/DocumentsScreen';

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

const ContainerSelected = styled.span`
	/* width: 93%; */
	display: flex;
	justify-content: space-between;
	margin: 2rem 4rem 0 4rem;


	@media (max-width: 940px) {
		/* width: 40%; */
	}
`;

const Title = styled.p`
	color: #85144B;
	font-size: 2rem;
	font-family: "Overpass"-Black;
	font-weight: 600;

	@media (max-width: 648px) {
		display: none;
	}
`;


const Select = styled.span`
	width: 35%;
	display: flex;
	flex-direction: row;

	@media (max-width: 1129px) {
		width: 42%;
	}
`;

const SpanSelect = styled.span`
	width: 65%;
	margin-top: 0.5rem;
	display: flex;
  flex-direction: column;
	position: relative;

	@media (max-width: 1125px) {
		width: 65%;
	}
	@media (max-width: 940px) {
		width: 47%;
	}
	@media (max-width: 648px) {
		width: 100%;
	}
`;

const Label = styled.label`
	color: #231F20;
	font-size: 1.2rem;
	font-family: Overpass;
	font-weight: bold;
	margin: 0.8rem 0.8rem 0 0;
	display: flex;
  align-items: center;

	@media (max-width: 648px) {
		display: none;
	}
`;

const InputSelect = styled.div`
	width: 100%;
	color: #959595;
	background-color: #FFFFFF;
	border: 0.5px solid #85144B;
	border-radius: 3px 3px 0 0;
	font-size: 0.875rem;
	padding: 0.7rem;
	display: flex;
	justify-content: space-between;
	z-index: 1;

`;

const InputSelectedItem = styled.div`
	width: 100%;
	background-color: #FFFFFF;
	border: 0.5px solid #85144B;
	border-radius: 0 0 3px 3px;
	position: absolute;
	top: 40px;
`;

const SelectedItem = styled.p`
	font-size: 0.9rem;
	color: #231F20;
	font-family: Overpass, Regular;
	padding: 0.4rem;

	:hover{
		background-color: ${props => (props.hover ? '#FFCFCD' : '#FFFFFF')};
		border: 0.5px solid #85144B;
	}

`;

const Table = styled.table`
	max-width: 100%;
	width: 100%;
	border-spacing: 0;
	padding: 2rem 3.5rem 0 3.5rem;
`;

const Thead = styled.thead`
	text-align: left;

	@media (max-width: 785px) {
		display: flex;
		flex-direction: row;
	}
`;

const Tr = styled.tr`
	height: 2rem;
	&:nth-child(even) {
    background-color: #FFCFCD;
  }
	&:nth-child(odd) {
    background-color: #FFFFFF;
	}
`;

const TableTitle = styled.th`
	background-color: #85144B;
	color: #FFFFFF;
	font-size: 0.8rem;
	font-family: Overpass, Regular;

	@media (max-width: 785px) {
		background-color: #FFFFFF;
		color: #85144B;
	}

	@media (max-width: 648px) {
		display: ${props => (props.titleMob === 'CPF' || props.titleMob === 'Usuário' ? 'none' : 'flex')};
		width: ${props => (props.width ? '15rem' : 'auto')};
	}
`;

const TableList = styled.td`
	color: #404040;

	@media (max-width: 785px) {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 648px) {
		display: ${props => (props.mob ? 'none' : 'flex')};
	}
`;

class OrganizationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: undefined,
			isSelect: undefined,
			selectedValue: 'Selecionar status',
			selectedItems: [
				'Selecionar status',
				'Pendente de Autorização',
				'Pendente de Pagamento',
				'Isento',
				'Pago',
				'Vencida',
			],
			// isModalCategory: undefined,
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
					organization: 'Instituto PrecisaSer',
					cpf: '00.000.000/0000-00',
					user: 'Jorge Amado da Silva',
					email: 'organização@email.com',
					telephone: '(11)11111-1111',
					createdIn: '19/05/19',
					authorization: '-',
					dueDate: '-',
					status: 'PENDENTE',
				},
				{
					organization: 'Vai na Web',
					cpf: '00.000.000/0000-00',
					user: 'Yasmin Miranda',
					email: 'nome@email.com',
					telephone: '(99) 99999-9999',
					createdIn: '18/06/19',
					authorization: '-',
					dueDate: '-',
					status: 'PAGO',
				},
				{
					organization: 'Casa de Rui Barbosa',
					cpf: '00.000.000/0000-00',
					user: 'Alice Barbosa Souza',
					email: 'organização@email.com',
					telephone: '(77)77777-7777',
					createdIn: '17/06/19',
					authorization: '02/06/19',
					dueDate: '02/07/19',
					status: 'PENDENTE',
				},
				{
					organization: 'Biblioteca da Maré',
					cpf: '00.000.000/0000-00',
					user: 'Vinicius Almeida Rodrigues',
					email: 'organização@email.com',
					telephone: '(22)22222-2222',
					createdIn: '15/06/19',
					authorization: '15/07/19',
					dueDate: '-',
					status: 'ISENTO',
				},
				{
					organization: 'Museu de Arte ZO',
					cpf: '00.000.000/0000-00',
					user: 'Tarcila do Amaral Gonçalves',
					email: 'organização@email.com',
					telephone: '(44)44444-4444',
					createdIn: '12/06/19',
					authorization: '15/06/19',
					dueDate: '15/07/19',
					status: 'VENCIDO',
				},
			],
		};
	}

	isModalOpen = (event) => {
		event.stopPropagation();
		this.setState({
			isModal: !this.state.isModal,
		});
	}

	isSelectOpen = (event) => {
		event.stopPropagation();
		this.setState({
			isSelect: !this.state.isSelect,
		});
	}

	handleSelectedValue = (item) => {
		this.setState({
			selectedValue: item,
		});
	}

	handleClick = (item) => {
		this.setState({
			redirect: item,
		});
	};

	renderSelected = () => (
		<ContainerSelected>
			<Title>Gerenciar organizações</Title>
			<Select>
				<Label>Vizualizar por:</Label>
				<SpanSelect>
					<InputSelect onClick={this.isSelectOpen}>
						<p>{this.state.selectedValue}</p>
						<img src={ImageCaminho} />
					</InputSelect>
					{this.state.isSelect && (
						<InputSelectedItem >
							{this.state.selectedItems.map((item, index) => (
								<SelectedItem onClick={() => this.handleSelectedValue(item)} key={index} hover>{item}</SelectedItem>
							))}
						</InputSelectedItem>
					)}
				</SpanSelect>
			</Select>
		</ContainerSelected>
	)

	render() {
		return (
			<Container>
				{this.state.isModal && <ModalOrganization handleCloseModal={this.isModalOpen} />}
				<Header handleClick={this.handleClick} />
				{this.state.redirect === 'organization' ? (
					<>
						{this.renderSelected()}
						<Table>
							<Thead>
								<Tr>
									{this.state.tableTitles.map(title => (
										<TableTitle key={title} titleMob={title}>{title}</TableTitle>
									))}
								</Tr>
							</Thead>
							<tbody>
								{this.state.tableDatas.map(item => (
									<Tr key={item}>
										<TableList>{item.organization}</TableList>
										<TableList mob>{item.cpf}</TableList>
										<TableList mob>{item.user}</TableList>
										<TableList>{item.email}</TableList>
										<TableList>{item.telephone}</TableList>
										<TableList>{item.createdIn}</TableList>
										<TableList>{item.authorization}</TableList>
										<TableList>{item.dueDate}</TableList>
										<TableList onClick={this.isModalOpen}>{item.status}</TableList>
									</Tr>
								))}
							</tbody>
						</Table>
					</>
				) : <DocumentsScreen />
				}
			</Container>
		);
	}
}

export default OrganizationScreen;
