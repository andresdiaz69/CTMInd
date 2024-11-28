# Stored Procedure: sp_InformesTransformacion

## Usa los objetos:
- [[InformesCentros]]
- [[InformesPresentacionesSedes]]
- [[informessedes]]
- [[InformesSedesCentros]]

```sql

-- ====================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 15/08/2018
-- Description:	Este procedimiento combina los datos contables y la configuracion de las sedes para facilitar su consulta 
--				en el momento de la ejecucion de las presentaciones, al mismo tiempo esta diseñado para realizar las transformaciones
--				necesarias como unirlo con la informacion de Israriego y agrupapar registros similares
-- Updates    : 2020-04-27 Se retiran las presentaciones por empresas por tener un tratamiento diferente en sp_InformesTransformacionEmpresas
--			    2020-07-23 Se agrega la empresa al select de la diferencia "Sin Distribuir"
-- ====================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesTransformacion] 

AS
BEGIN

	SET NOCOUNT ON

	IF OBJECT_ID (N'dbo.InformesDatosPresentaciones', N'U') IS NOT NULL
	BEGIN
		DROP TABLE dbo.InformesDatosPresentaciones
	END

	DECLARE @SQL as nvarchar(MAX)
	DECLARE @CodigoCentro as smallint
	DECLARE @CodigoSeccion as smallint
	DECLARE	@CodigoMarca smallint
	DECLARE	@CodigoSede as smallint
	DECLARE	@Diferencia as bit
	DECLARE	@CodigoPresentacion as smallint
	DECLARE	@Departamento as nvarchar(100)
	DECLARE	@Empresa as smallint
	DECLARE @nFilas as int
	DECLARE @aSede as int = 1

	DECLARE Sede_cursor CURSOR FOR  

		select *,@@CURSOR_ROWS from (
			select distinct d.CodigoCentro,d.CodigoSeccion,d.CodigoMarca,b.CodigoSede ,a.Diferencia, 
			(select top 1 CodigoPresentacion from InformesPresentacionesSedes where CodigoSede = a.CodigoSede) CodigoPresentacion,
			d.Departamento,d.Empresa 
			from informessedes a 
				 left join InformesSedesCentros b on a.CodigoSede = b.CodigoSede
				 left join InformesCentros d on b.CentroID = d.CentroID 
			where a.Activa = 1 and d.Activo = 1
			--order by CodigoPresentacion,b.CodigoSede 
		) Configuracion where CodigoPresentacion Not In (78,79,80,81,147) -- Las presentaciones por Empresas se calculan en sp_InformesTransformacionEmpresas 
		order by CodigoPresentacion,CodigoSede  
	OPEN Sede_cursor;  

-- Perform the first fetch.  
	FETCH NEXT FROM Sede_cursor  
		INTO @CodigoCentro, @CodigoSeccion, @CodigoMarca, @CodigoSede, @Diferencia, @CodigoPresentacion, @Departamento, @Empresa, @nFilas

-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		print rtrim(cast(@CodigoPresentacion as char))+' - '+rtrim(cast(@CodigoSede as char))+' - '+rtrim(cast(@CodigoCentro as char))+ ' - ('+rtrim(cast(@aSede as char))+'/'+rtrim(cast(@@CURSOR_ROWS as char))+')'

			Set @SQL = ''

			IF OBJECT_ID (N'dbo.InformesDatosPresentaciones', N'U') IS NOT NULL
			BEGIN
				Set @SQL = @SQL + 'INSERT INTO InformesDatosPresentaciones '
			END

--			Set @SQL = @SQL + ' select a.CodigoSede,a.NombreSede,d.CodigoCentro,d.CodigoSeccion,d.Tipo ,c.Año,c.Mes,c.Empresa,c.NombreEmpresa,c.Centro,c.NombreCentro,c.Seccion,c.Departamento,c.CodigoMarca,c.NombreMarca,c.NombreGama,c.CodigoGama,c.Cuenta,c.Saldo '  
			Set @SQL = @SQL + ' select a.CodigoSede,a.NombreSede,d.Tipo,c.Año,c.Mes,c.Empresa,c.NombreEmpresa,c.Centro,c.NombreCentro,c.Seccion,c.Departamento,c.CodigoMarca,c.NombreMarca,c.NombreGama,c.CodigoGama,c.Cuenta,c.Saldo '  

			IF OBJECT_ID (N'dbo.InformesDatosPresentaciones', N'U') IS NULL
			BEGIN
				Set @SQL = @SQL + 'into InformesDatosPresentaciones '
			END

			Set @SQL = @SQL + ' from informessedes a '
			Set @SQL = @SQL + ' inner join InformesSedesCentros b on a.CodigoSede = b.CodigoSede '
			Set @SQL = @SQL + ' inner join InformesCentros d on b.CentroId = d.CentroId '
			Set @SQL = @SQL + ' inner join InformesPresentacionesSedes e on a.CodigoSede = e.CodigoSede '
			Set @SQL = @SQL + ' inner join ( '
			Set @SQL = @SQL + ' select Año,Mes,Empresa,NombreEmpresa,Centro,NombreCentro,Seccion,Departamento,CodigoMarca,NombreMarca,NombreGama,CodigoGama,Cuenta,Saldo from informesDatosContables where (FkAsientoGestionEliminacion is null or FkAsientoGestionEliminacion not in (''FI_PyG'',''FI_CIERRE'')) '
			Set @SQL = @SQL + ' union all '
			Set @SQL = @SQL + ' select Año,Mes,Empresa,NombreEmpresa,Centro,NombreCentro,Seccion,Departamento,CodigoMarca,NombreMarca,NombreGama,CodigoGama,Cuenta,Saldo from informesDatosIsrariego '
			Set @SQL = @SQL + ' ) c on d.CodigoCentro = c.Centro and d.Empresa = c.Empresa '
			Set @SQL = @SQL + ' where e.CodigoPresentacion = '+ltrim(str(@CodigoPresentacion))+' and d.CodigoCentro = '+ltrim(str(@CodigoCentro))+' and a.CodigoSede = '+ltrim(str(@CodigoSede))+' and d.Empresa = +'+ltrim(str(@Empresa)) 

			if @CodigoSeccion is not null 
			BEGIN
				Set @SQL = @SQL + '	and d.CodigoSeccion = c.Seccion and d.CodigoSeccion = '+ltrim(str(@CodigoSeccion))
			END
			ELSE IF @Diferencia = 1
			BEGIN
				Set @SQL = @SQL + ' and not exists '
				Set @SQL = @SQL + ' ( '
				Set @SQL = @SQL + ' SELECT t1.CodigoPresentacion,t3.CodigoSede,t5.CodigoCentro,t5.CodigoSeccion '
				Set @SQL = @SQL + ' from InformesPresentaciones t1  '
				Set @SQL = @SQL + ' left join InformesPresentacionesSedes t2 on t1.CodigoPresentacion = t2.CodigoPresentacion '
				Set @SQL = @SQL + ' left join InformesSedes t3 on t2.CodigoSede = t3.CodigoSede '
				Set @SQL = @SQL + ' left join InformesSedesCentros t4 on t3.CodigoSede = t4.CodigoSede '
				Set @SQL = @SQL + ' left join InformesCentros t5 on t4.CentroID  = t5.CentroID  '
				Set @SQL = @SQL + ' left join Centros t6 on t5.CodigoCentro = t6.CodigoCentro '
				Set @SQL = @SQL + ' where t1.CodigoPresentacion in (e.CodigoPresentacion) and t5.Empresa in (d.Empresa) and t5.CodigoCentro in (c.Centro) and t5.CodigoSeccion = c.Seccion '
--2020-07-27 Se agrega la empresa
--				Set @SQL = @SQL + ' where t1.CodigoPresentacion in (e.CodigoPresentacion) and t5.CodigoCentro in (c.Centro) and t5.CodigoSeccion = c.Seccion '
				Set @SQL = @SQL + ' ) '
			END

			if @CodigoMarca is not null 
			BEGIN
				Set @SQL = @SQL + '	and d.CodigoMarca = c.CodigoMarca and d.CodigoMarca = '+ltrim(str(@CodigoMarca))
			END

-- 2018-12-28 LFG: Se corrigue sintaxis
			--if @Departamento <> ''
			--BEGIN
			--	Set @SQL = @SQL + '	and d.Departamento = c.Departamento and d.Departamento = '+ltrim(str(@Departamento))
			--END

			if @Departamento <> ''
			BEGIN
				Set @SQL = @SQL + '	and d.Departamento = c.Departamento and d.Departamento = '''+ltrim(@Departamento)+''''
			END

--		PRINT @SQL
		Exec (@SQL);

		SET @aSede = @aSede + 1

		-- This is executed as long as the previous fetch succeeds.  
		FETCH NEXT FROM Sede_cursor
			INTO @CodigoCentro, @CodigoSeccion, @CodigoMarca, @CodigoSede, @Diferencia, @CodigoPresentacion, @Departamento, @Empresa, @nFilas
	END  

	CLOSE Sede_cursor 
	DEALLOCATE Sede_cursor  
	
 
END

```
