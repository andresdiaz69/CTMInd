# View: v_Requisiciones_Consulta_Salarios

## Usa los objetos:
- [[v_MLC_Requisiciones_Consulta_Salarios]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Consulta_Salarios] AS
SELECT Cedula, Nombres, Apellido1, Apellido2, Codigo_Cargo, Nombre_Cargo, Codigo_UnidadDeNegocio, Nombre_UnidadDeNegocio, Salario 
FROM [Novasoft_CT_MM].[dbo].[v_MLC_Requisiciones_Consulta_Salarios]

```
