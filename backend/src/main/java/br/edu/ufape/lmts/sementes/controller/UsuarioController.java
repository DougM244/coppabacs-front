package br.edu.ufape.lmts.sementes.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ufape.lmts.sementes.controller.dto.request.UsuarioRequest;
import br.edu.ufape.lmts.sementes.controller.dto.request.UsuarioUpdateRequest;
import br.edu.ufape.lmts.sementes.controller.dto.response.UsuarioResponse;
import br.edu.ufape.lmts.sementes.enums.TipoUsuario;
import br.edu.ufape.lmts.sementes.facade.Facade;
import br.edu.ufape.lmts.sementes.model.Usuario;
import br.edu.ufape.lmts.sementes.service.exception.EmailExistsException;
import br.edu.ufape.lmts.sementes.service.exception.ObjectNotFoundException;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;

@Hidden
@RestController
@RequestMapping("${prefix.url}")
public class UsuarioController {
	@Autowired
	private Facade facade;
	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("usuario")
	public List<UsuarioResponse> getAllUsuario() {
		return facade.getAllUsuario().stream().map(UsuarioResponse::new).toList();
	}

	@GetMapping(value = "usuario/page")
	public Page<UsuarioResponse> getPage(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "24") Integer linesPerPage,
			@RequestParam(defaultValue = "id") String orderBy,
			@RequestParam(defaultValue = "DESC") String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<Usuario> list = facade.findPageUsuario(pageRequest);
		return list.map(UsuarioResponse::new);
	}

	@PostMapping("usuario")
	public UsuarioResponse createUsuario(@Valid @RequestBody UsuarioRequest newObj) throws EmailExistsException {
		return new UsuarioResponse(facade.saveUsuario(newObj.convertToEntity()));
	}

	@GetMapping("usuario/{id}")
	public UsuarioResponse getUsuarioById(@PathVariable Long id) {
		return new UsuarioResponse(facade.findUsuarioById(id));
	}

	@GetMapping("usuario/e/{email}")
	public UsuarioResponse getUsuarioByEmail(@PathVariable String email) {
		return new UsuarioResponse(facade.findUsuarioByEmail(email));
	}

	@GetMapping("usuario/cpf/{cpf}")
	public UsuarioResponse getUsuarioByCpf(@PathVariable String cpf) {
		return new UsuarioResponse(facade.findUsuarioByCpf(cpf));
	}

	@PatchMapping("usuario/{id}")
	public UsuarioResponse updateUsuario(@PathVariable Long id, @Valid @RequestBody UsuarioUpdateRequest obj) {
		try {
			Usuario oldObject = facade.findUsuarioById(id);
			modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
			TypeMap<UsuarioUpdateRequest, Usuario> typeMapper = modelMapper
					.typeMap(UsuarioUpdateRequest.class, Usuario.class)
					.addMappings(mapper -> mapper.skip(Usuario::setId))
					.addMappings(mapper -> mapper.skip(Usuario::setSenha));
			typeMapper.map(obj, oldObject);
			return new UsuarioResponse(facade.updateUsuario(oldObject));
		} catch (RuntimeException e) {
			if (!(e instanceof ObjectNotFoundException))
				throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
			else
				throw e;
		}

	}

	@DeleteMapping("usuario/{id}")
	public String deleteUsuario(@PathVariable Long id) {
		try {
			facade.deleteUsuario(id);
			return "";
		} catch (RuntimeException e) {
			if (!(e instanceof ObjectNotFoundException))
				throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
			else
				throw e;
		}

	}

	@GetMapping("usuario/solicitacoes")
	public List<UsuarioResponse> filterUsuariosComRoleUsuario() {
		return facade.getAllUsuario().stream().filter(usuario -> usuario.getRoles().contains(TipoUsuario.USUARIO))
				.map(UsuarioResponse::new).collect(Collectors.toList());
	}

}
