# Stored Procedure: sp_InformesTransformacionEmpresas

## Usa los objetos:
- [[InformesCentros]]
- [[informesDatosContables]]
- [[informesDatosIsrariego]]
- [[InformesDatosPresentaciones]]
- [[informesPresentaciones]]
- [[informesPresentacionesSedes]]
- [[informesSedes]]
- [[InformesSedesCentros]]

```sql

-- ====================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2020/02/25
-- Description:	Este procedimiento Prepara los datos para la presentaciones por Empresas, Casatoro Motorysa (Con/Sin Digital) 
-- Mod date: 2020-02-28 Se modifica par que calcule automaticamente el año actual o lo calcule si se lo envian como parametro
-- ====================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesTransformacionEmpresas] 

	@AñoActual as smallint = 0

AS
BEGIN

	--Se borran los datos del Año actual y los del año anterior por ajustes que se puedan haber realizado
	DECLARE @AñoInicial int 
	
	IF @AñoActual = 0 
		SET @AñoInicial = YEAR(DATEADD(year, -1,GETDATE()))
	ELSE 
		SET @AñoInicial = @AñoActual-1

	-- Inicializa movimiento cargado anteriormente especificamente para las presentaciones de Empresas y segun el año recibido

		--Select * from InformesDatosPresentaciones where Año>=@AñoInicial and CodigoSede in (Select CodigoSede from informesPresentacionesSedes where CodigoPresentacion in (78,79,80,81))
		Delete from InformesDatosPresentaciones   where Año>=@AñoInicial and CodigoSede in (Select CodigoSede from informesPresentacionesSedes where CodigoPresentacion in (78,79,80,81,147))

	-- Empresas Sin Centro Digital

		insert into InformesDatosPresentaciones
			select S.CodigoSede,S.NombreSede,'Centro' Tipo,DC.Año,DC.Mes,DC.Empresa,DC.NombreEmpresa,'' Centro,'' NombreCentro,'' Seccion, '' Departamento,'' CodigoMarca,'' NombreMarca,
			'' NombreGama,'' CodigoGama,DC.Cuenta,sum(DC.Saldo) Saldo 
			from informesPresentaciones P 
			left join InformesPresentacionesSedes PS on P.CodigoPresentacion = PS.CodigoPresentacion
			left join informesSedes S ON PS.CodigoSede = S.CodigoSede
			left join InformesSedesCentros SC ON S.CodigoSede = SC.CodigoSede
			left join InformesCentros C ON SC.CentroID = C.CentroID
			left join (	select Año,Mes,Empresa,NombreEmpresa,Centro,NombreCentro,Seccion,Departamento,CodigoMarca,NombreMarca,NombreGama,CodigoGama,Cuenta,Saldo 
			from informesDatosContables where Año>=@AñoInicial and (FkAsientoGestionEliminacion is null or FkAsientoGestionEliminacion not in ('FI_PyG','FI_CIERRE')) 
			union all 
			select Año,Mes,Empresa,NombreEmpresa,Centro,NombreCentro,Seccion,Departamento,CodigoMarca,NombreMarca,NombreGama,CodigoGama,Cuenta,Saldo 
			from informesDatosIsrariego where Año>=@AñoInicial
						) DC ON DC.Empresa = C.Empresa
			where P.CodigoPresentacion in (78,79,147) and Año is not null
			group by S.CodigoSede,S.NombreSede,DC.Año,DC.Mes,DC.Empresa,DC.NombreEmpresa,DC.Cuenta 

	-- Empresas Con centro Digital

		insert into InformesDatosPresentaciones
			select S.CodigoSede,S.NombreSede,'Centro' Tipo,DC.Año,DC.Mes,DC.Empresa,DC.NombreEmpresa,'' Centro,'' NombreCentro,'' Seccion, '' Departamento,'' CodigoMarca,'' NombreMarca,
			'' NombreGama,'' CodigoGama,DC.Cuenta,sum(DC.Saldo) Saldo 
			from informesPresentaciones P left join InformesPresentacionesSedes PS on P.CodigoPresentacion = PS.CodigoPresentacion
			left join informesSedes S ON PS.CodigoSede = S.CodigoSede
			left join InformesSedesCentros SC ON S.CodigoSede = SC.CodigoSede
			left join InformesCentros C ON SC.CentroID = C.CentroID
			left join (	select Año,Mes,Empresa,NombreEmpresa,Centro,NombreCentro,Seccion,Departamento,CodigoMarca,NombreMarca,NombreGama,CodigoGama,Cuenta,Saldo 
						from informesDatosContables where Año>=@AñoInicial and Centro <> 137 
						and (FkAsientoGestionEliminacion is null or FkAsientoGestionEliminacion not in ('FI_PyG','FI_CIERRE')) 
						union all 
						select Año,Mes,Empresa,NombreEmpresa,Centro,NombreCentro,Seccion,Departamento,CodigoMarca,NombreMarca,NombreGama,CodigoGama,Cuenta,Saldo 
						from informesDatosIsrariego where Año>=@AñoInicial --and Centro <> 137 -- Se quitar el centro porque algunas secciones se deben tomar JCOA 02 Mar 2023
						and Seccion not in (693,908,1146) -- Estas secciones no se deben tomar en la presentación JCOA 02 Mar 2023
						and centro not in  (158,161,162) -- Este centro no se debe sumar este solo esta creado en la normalizada JCOA 02 Mar 2023. Reunión con Lucy y Luzlinda
						) DC ON DC.Empresa = C.Empresa
			where P.CodigoPresentacion in (80,81) and Año is not null
			group by S.CodigoSede,S.NombreSede,DC.Año,DC.Mes,DC.Empresa,DC.NombreEmpresa,DC.Cuenta 

END

```
