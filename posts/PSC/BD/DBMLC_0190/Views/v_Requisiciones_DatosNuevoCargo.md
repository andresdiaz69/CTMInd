# View: v_Requisiciones_DatosNuevoCargo

## Usa los objetos:
- [[Requisiciones_EstadoNuevoCargo]]
- [[Requisiciones_NuevoCargo]]
- [[v_Requisiciones_EmailUsers]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_DatosNuevoCargo] AS
SELECT DISTINCT C.Id, A.CedulaSolicitante, C.NombreCompleto, ISNULL(c.Unidad_Negocio,'')Unidad_Negocio, U.NombreUnidadNegocio, A.IdEstadoCargo, B.EstadoCargo, 
	A.IdNuevoCargo, A.NombreNuevoCargo, A.RequisitosCargo, A.Responsabilidades, A.FechaCreacion
FROM		Requisiciones_NuevoCargo		A 
INNER JOIN	Requisiciones_EstadoNuevoCargo	B	ON A.IdEstadoCargo = B.IdEstadoCargo
INNER JOIN	
(
	SELECT DISTINCT Id, UserName, NombreCompleto, Unidad_Negocio
	FROM v_Requisiciones_EmailUsers		
)	C	ON A.CedulaSolicitante = C.UserName
LEFT JOIN vw_UnidadDeNegocio U ON c.Unidad_Negocio = U.UnidadNegocio_Requisicion

```
