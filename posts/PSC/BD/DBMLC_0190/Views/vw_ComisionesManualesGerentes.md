# View: vw_ComisionesManualesGerentes

## Usa los objetos:
- [[vw_ComisionesManualesEmpleadosActivos]]

```sql
CREATE view [com].[vw_ComisionesManualesGerentes] 

as
select * from (
		select * from com.vw_ComisionesManualesEmpleadosActivos
			where  Codigo_Cargo = '83' --Gerente general
			or Codigo_Cargo = '879' -- Gerente de transformación
			or Codigo_Cargo = '514' -- Gerente canal digital
			or Codigo_Cargo = '429' -- Gerente Técnico Maquinaria Construcción
			or Codigo_Cargo = '79' -- Gerente de linea
			or Codigo_Cargo = '520' -- Gerente Fábrica
				) a
where Ano_Periodo = YEAR(GETDATE()) and Mes_Periodo = MONTH(GETDATE())


```
