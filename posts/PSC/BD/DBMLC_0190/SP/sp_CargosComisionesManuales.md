# Stored Procedure: sp_CargosComisionesManuales

## Usa los objetos:
- [[vw_CargosComisionesManuales]]

```sql
CREATE PROCEDURE [com].[sp_CargosComisionesManuales] 
    @codigo_departamento varchar (2),
	@Unidad_Negocio nvarchar (255)
AS   
	SELECT *
    FROM vw_CargosComisionesManuales
    WHERE codigo_departamento = @codigo_departamento and Unidad_Negocio = @Unidad_Negocio  

```
