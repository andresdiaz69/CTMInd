# View: v_Requisiciones_Contrataciones

## Usa los objetos:
- [[EmpleadosRetirados]]
- [[Requisiciones_Entrevista]]
- [[Requisiciones_HistoricoSolicitud]]
- [[v_Requisiciones_ConsultaSolicitudes]]
- [[v_Requisiciones_EmailUsers]]
- [[v_Requisiciones_SolicitudesCandidatos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Contrataciones] AS
SELECT DISTINCT s.Numero_solicitud, s.TipoSolicitud, (s.DetalleEstado)EstadoSolicitud, s.Solicitante, s.FechaInicioContrato, (s.EstadoNomina)EstadoContrato, s.NombreCargo, s.Empresa, s.UnidadNegocio, 
	s.Marca, s.Centro, s.Seccion, s.Departamento, s.Sede, c.Cedula, (c.NombreCompleto)NombreCandidato, c.EstadoCandidato, c.Celular, c.FechaNacimiento, c.Correo, c.Direccion,
	(e.CiudadCandidato)LugarResidenciaCandidato,(c.CC_Jefe1)CedulaJefe, 
	CASE WHEN c.NombreJefe1 IS NOT NULL THEN REPLACE(REPLACE(REPLACE(c.NombreJefe1,' ','<>'),'><',''),'<>',' ')
		ELSE R.NombreCompleto END NombreJefe,h.UserModifico,(u.NombreCompleto)RevisadoPor,s.Observaciones,
	(h.FechaModificacion)FechaCierreSolicitud
FROM v_Requisiciones_ConsultaSolicitudes s
LEFT JOIN v_Requisiciones_SolicitudesCandidatos c on c.num_solicitud = s.Numero_solicitud
LEFT JOIN Requisiciones_Entrevista e on s.Numero_solicitud = e.IdSolicitud
LEFT JOIN Requisiciones_HistoricoSolicitud h on s.Numero_solicitud = h.IdSolicitud and s.Estado = h.IdEstado
LEFT JOIN v_Requisiciones_EmailUsers u on u.Id= h.UserModifico
LEFT JOIN 
(
	SELECT CodigoEmpleado, NombreCompleto = REPLACE(REPLACE(REPLACE(Nombres + ' ' + Apellido1 + ' ' + Apellido2,' ','<>'),'><',''),'<>',' ') 
	FROM EmpleadosRetirados
) R ON C.CC_Jefe1 = R.CodigoEmpleado
WHERE s.Estado = 7 and c.IdEstadoCandidato = 8

```
