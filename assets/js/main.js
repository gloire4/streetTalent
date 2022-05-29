'use strict'

		const openModel = ()=> document.getElementById('model').classList.add('active')

		const closeModel = ()=> {
			clearFields()
			document.getElementById('model').classList.remove('active')
		}

		const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_membre'))??[]
		const setLocalStorage = (db_membre)=> localStorage.setItem('db_membre', JSON.stringify(db_membre))

		const readMembre = ()=> getLocalStorage()

		const createMembre = (membre)=> {
			const db_membre = getLocalStorage()
			db_membre.push(membre)
			setLocalStorage(db_membre)
		} 

		const updateMembre = (index, membre)=> {
			const db_membre = readMembre()
			db_membre[index] = membre
			setLocalStorage(db_membre)
		}


		const deleteMembre = (index)=> {
			const db_membre = readMembre()
			db_membre.splice(index, 1)
			setLocalStorage(db_membre)
		}

		const isValidFields = ()=> {
		   return document.getElementById('form').reportValidity()
		}

		const clearFields = ()=> {
			const fields = document.querySelectorAll('.model-field')
			fields.forEach(field => field.value = "")
		} 

		const saveMembre = ()=>{
			if(isValidFields()){
				const membre = {
					name: document.getElementById('name').value,
					email: document.getElementById('email').value,
					domaine: document.getElementById('domaine').value,
					adresse: document.getElementById('adresse').value,
					genre: document.getElementById('genre').value,
					typeProfil: document.getElementById('typeProfil').value,
				}
				//console.log('The Cadastral membre: ' + membre)
				const index = document.getElementById('name').dataset.index
				if(index == 'new'){
					createMembre(membre)
					listMembre()
					closeModel()
				}else{
					updateMembre(index, membre)
					listMembre()
					closeModel()
				}
			}
		}


		const createRow = (membre, index)=> {
			const newRow = document.createElement('tr')
			newRow.innerHTML = `
				<td>${membre.name}</td>
				<td>${membre.email}</td>
				<td>${membre.domaine}</td>
				<td>${membre.adresse}</td>
				<td>${membre.genre}</td>
				<td>${membre.typeProfil}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Editer</button>
					<button type="button" class="button red" id="delete-${index}">Supprimer</button>
				</td>
			`
			document.querySelector('#tblMembre>tbody').appendChild(newRow)
		}

		const crearTable = ()=> {
			const rows = document.querySelectorAll('#tblMembre>tbody tr')
			rows.forEach(row => row.parentNode.removeChild(row))
		}

		const listMembre = ()=> {
			const membres =  readMembre()
			// console.log(Membres)
			crearTable()
			membres.forEach(createRow)
		}

		const fillFields = (membre)=> {
			document.getElementById('name').value = membre.name
			document.getElementById('email').value = membre.email
			document.getElementById('domaine').value = membre.domaine
			document.getElementById('adresse').value = membre.adresse
			document.getElementById('genre').value = membre.genre
			document.getElementById('typeProfil').value = membre.typeProfil

			document.getElementById('name').dataset.index = membre.index
		}

		const editMembre = (index)=>{
			const membre = readMembre()[index]
			membre.index = index
			fillFields(membre)
			openModel()
		}

		const editDelete = (event)=>{
			if(event.target.type == 'button'){
				const [action, index] = event.target.id.split('-')
				if(action == 'edit'){
					editMembre(index)
				}else{
					const membre = readMembre()[index]
					const response = confirm(`Etes-vous sûr de vouloir supprimer le membre ${membre.name}`)
					if(response){
						deleteMembre(index)
						listMembre()
					}
				}
			}
		}

		listMembre()

		document.getElementById('idMembre').addEventListener('click', openModel)
		document.getElementById('modelClose').addEventListener('click', closeModel)
		document.getElementById('save').addEventListener('click', saveMembre)
		document.getElementById('cancel').addEventListener('click', closeModel)
		document.querySelector('#tblMembre>tbody').addEventListener('click', editDelete)