# Stored Procedure: sp_Categoria_Clientes

## Usa los objetos:
- [[ClienteCategorias]]
- [[EmpresaCentroTerceros]]

```sql
CREATE procedure [dbo].[sp_Categoria_Clientes] as

SELECT  PkFkTerceros, FkClienteCategorias, Descripcion
  FROM [192.168.80.18].[DMS90280].CM.EmpresaCentroTerceros as t1 with(nolock) 
 inner join [192.168.80.18].[DMS90280].CM.ClienteCategorias as t2 with(nolock) on t2.PkClienteCategorias_Iden=t1.FkClienteCategorias
where t1.FechaBaja is null
GROUP BY PkFkTerceros, FkClienteCategorias, Descripcion

```
